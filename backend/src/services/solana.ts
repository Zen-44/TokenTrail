import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  SendTransactionError,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  createTransferInstruction,
} from "@solana/spl-token";
import "dotenv/config";
import {
  createCreateMetadataAccountV3Instruction,
  DataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  Metaplex,
  keypairIdentity,
  irysStorage,
  toMetaplexFile,
} from "@metaplex-foundation/js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

if (!process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY not found in .env file");
}

// Payer for transactions
const secretKeyArray = JSON.parse(process.env.SECRET_KEY);
const payer = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(payer))
    .use(irysStorage({
        address: 'https://devnet.irys.xyz',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
    }));

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// This function will create a new token on the Solana devnet
export async function createToken(
  tokenName: string,
  tokenSymbol: string,
  tokenSupply: number,
  tokenLogo: Buffer
) {
  try {
    console.log(`Starting token creation for ${tokenName} (${tokenSymbol})`);
    console.log(`Payer public key: ${payer.publicKey.toBase58()}`);

    // Create a new mint
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey, // Mint authority
      payer.publicKey, // Freeze authority
      9 // Decimals
    );
    console.log(`New mint created: ${mint.toBase58()}`);

    // Upload metadata in a two-step process to ensure correct URLs.

    const metaplexFile = toMetaplexFile(tokenLogo, "logo.png");
    const imageUri = (await metaplex.storage().upload(metaplexFile)).replace('https://arweave.net/', 'https://devnet.irys.xyz/');
    console.log(`Image uploaded to: ${imageUri}`);

    const { uri } = await metaplex.nfts().uploadMetadata({
      name: tokenName,
      symbol: tokenSymbol,
      image: imageUri, // Use the URI from the image upload
    });

    const correctedUri = uri.replace('https://arweave.net/', 'https://devnet.irys.xyz/');
    console.log(`Metadata uploaded. URI: ${correctedUri}`);

    // 3. Create metadata account
    const metadataData: DataV2 = {
      name: tokenName,
      symbol: tokenSymbol,
      uri: correctedUri,
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };

    const metadataPDA = (
      await PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )
    )[0];

    const transaction = new Transaction().add(
      createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPDA,
          mint: mint,
          mintAuthority: payer.publicKey,
          payer: payer.publicKey,
          updateAuthority: payer.publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: metadataData,
            isMutable: true,
            collectionDetails: null,
          },
        }
      )
    );

    await sendAndConfirmTransaction(connection, transaction, [payer]);
    console.log("Metadata account created successfully.");

    // Get or create associated token account
    console.log("Getting or creating token account...");
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );
    console.log(`Token account: ${tokenAccount.address.toBase58()}`);

    // Mint tokens
    console.log(`Minting ${tokenSupply} tokens...`);
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer, // Mint authority is the payer
      tokenSupply * Math.pow(10, 9) // Amount
    );
    console.log("Tokens minted successfully.");

    return {
      tokenAddress: mint.toBase58(),
      tokenAccountAddress: tokenAccount.address.toBase58(),
    };
  } catch (error) {
    if (error instanceof SendTransactionError) {
      console.error("Transaction failed:", error.logs);
    }
    console.error("Error creating token:", error);
    throw new Error("Failed to create token");
  }
}

export async function sendTokens(
  mintAddress: string,
  toAddress: string,
  amount: number
) {
  try {
    const mint = new PublicKey(mintAddress);
    const destination = new PublicKey(toAddress);

    // Get or create the sender's token account
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    // Get or create the recipient's token account
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      destination
    );

    // Transfer tokens
    const transaction = new Transaction().add(
      createTransferInstruction(
        fromTokenAccount.address,
        toTokenAccount.address,
        payer.publicKey,
        amount * 10 ** 9 // Amount must be in the smallest unit of the token
      )
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [payer]
    );

    console.log(
      `Successfully sent ${amount} tokens to ${toAddress}. Transaction signature: ${signature}`
    );
    return signature;
  } catch (error) {
    console.error("Error sending tokens:", error);
    throw new Error("Failed to send tokens");
  }
}
