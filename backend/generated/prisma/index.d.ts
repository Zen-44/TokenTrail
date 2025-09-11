
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Festival
 * 
 */
export type Festival = $Result.DefaultSelection<Prisma.$FestivalPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model Mission
 * 
 */
export type Mission = $Result.DefaultSelection<Prisma.$MissionPayload>
/**
 * Model FestivalPhoto
 * 
 */
export type FestivalPhoto = $Result.DefaultSelection<Prisma.$FestivalPhotoPayload>
/**
 * Model MissionPhoto
 * 
 */
export type MissionPhoto = $Result.DefaultSelection<Prisma.$MissionPhotoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Festivals
 * const festivals = await prisma.festival.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Festivals
   * const festivals = await prisma.festival.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.festival`: Exposes CRUD operations for the **Festival** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Festivals
    * const festivals = await prisma.festival.findMany()
    * ```
    */
  get festival(): Prisma.FestivalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mission`: Exposes CRUD operations for the **Mission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Missions
    * const missions = await prisma.mission.findMany()
    * ```
    */
  get mission(): Prisma.MissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.festivalPhoto`: Exposes CRUD operations for the **FestivalPhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FestivalPhotos
    * const festivalPhotos = await prisma.festivalPhoto.findMany()
    * ```
    */
  get festivalPhoto(): Prisma.FestivalPhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.missionPhoto`: Exposes CRUD operations for the **MissionPhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MissionPhotos
    * const missionPhotos = await prisma.missionPhoto.findMany()
    * ```
    */
  get missionPhoto(): Prisma.MissionPhotoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.0
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Festival: 'Festival',
    Token: 'Token',
    Mission: 'Mission',
    FestivalPhoto: 'FestivalPhoto',
    MissionPhoto: 'MissionPhoto'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "festival" | "token" | "mission" | "festivalPhoto" | "missionPhoto"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Festival: {
        payload: Prisma.$FestivalPayload<ExtArgs>
        fields: Prisma.FestivalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FestivalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FestivalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          findFirst: {
            args: Prisma.FestivalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FestivalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          findMany: {
            args: Prisma.FestivalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>[]
          }
          create: {
            args: Prisma.FestivalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          createMany: {
            args: Prisma.FestivalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FestivalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>[]
          }
          delete: {
            args: Prisma.FestivalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          update: {
            args: Prisma.FestivalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          deleteMany: {
            args: Prisma.FestivalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FestivalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FestivalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>[]
          }
          upsert: {
            args: Prisma.FestivalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPayload>
          }
          aggregate: {
            args: Prisma.FestivalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFestival>
          }
          groupBy: {
            args: Prisma.FestivalGroupByArgs<ExtArgs>
            result: $Utils.Optional<FestivalGroupByOutputType>[]
          }
          count: {
            args: Prisma.FestivalCountArgs<ExtArgs>
            result: $Utils.Optional<FestivalCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      Mission: {
        payload: Prisma.$MissionPayload<ExtArgs>
        fields: Prisma.MissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          findFirst: {
            args: Prisma.MissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          findMany: {
            args: Prisma.MissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>[]
          }
          create: {
            args: Prisma.MissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          createMany: {
            args: Prisma.MissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>[]
          }
          delete: {
            args: Prisma.MissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          update: {
            args: Prisma.MissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          deleteMany: {
            args: Prisma.MissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>[]
          }
          upsert: {
            args: Prisma.MissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPayload>
          }
          aggregate: {
            args: Prisma.MissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMission>
          }
          groupBy: {
            args: Prisma.MissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MissionCountArgs<ExtArgs>
            result: $Utils.Optional<MissionCountAggregateOutputType> | number
          }
        }
      }
      FestivalPhoto: {
        payload: Prisma.$FestivalPhotoPayload<ExtArgs>
        fields: Prisma.FestivalPhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FestivalPhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FestivalPhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>
          }
          findFirst: {
            args: Prisma.FestivalPhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FestivalPhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>
          }
          findMany: {
            args: Prisma.FestivalPhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>[]
          }
          create: {
            args: Prisma.FestivalPhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>
          }
          createMany: {
            args: Prisma.FestivalPhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FestivalPhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>[]
          }
          delete: {
            args: Prisma.FestivalPhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>
          }
          update: {
            args: Prisma.FestivalPhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>
          }
          deleteMany: {
            args: Prisma.FestivalPhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FestivalPhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FestivalPhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>[]
          }
          upsert: {
            args: Prisma.FestivalPhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestivalPhotoPayload>
          }
          aggregate: {
            args: Prisma.FestivalPhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFestivalPhoto>
          }
          groupBy: {
            args: Prisma.FestivalPhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<FestivalPhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.FestivalPhotoCountArgs<ExtArgs>
            result: $Utils.Optional<FestivalPhotoCountAggregateOutputType> | number
          }
        }
      }
      MissionPhoto: {
        payload: Prisma.$MissionPhotoPayload<ExtArgs>
        fields: Prisma.MissionPhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MissionPhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MissionPhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>
          }
          findFirst: {
            args: Prisma.MissionPhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MissionPhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>
          }
          findMany: {
            args: Prisma.MissionPhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>[]
          }
          create: {
            args: Prisma.MissionPhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>
          }
          createMany: {
            args: Prisma.MissionPhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MissionPhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>[]
          }
          delete: {
            args: Prisma.MissionPhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>
          }
          update: {
            args: Prisma.MissionPhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>
          }
          deleteMany: {
            args: Prisma.MissionPhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MissionPhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MissionPhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>[]
          }
          upsert: {
            args: Prisma.MissionPhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissionPhotoPayload>
          }
          aggregate: {
            args: Prisma.MissionPhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMissionPhoto>
          }
          groupBy: {
            args: Prisma.MissionPhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<MissionPhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.MissionPhotoCountArgs<ExtArgs>
            result: $Utils.Optional<MissionPhotoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    festival?: FestivalOmit
    token?: TokenOmit
    mission?: MissionOmit
    festivalPhoto?: FestivalPhotoOmit
    missionPhoto?: MissionPhotoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FestivalCountOutputType
   */

  export type FestivalCountOutputType = {
    missions: number
    photos: number
  }

  export type FestivalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    missions?: boolean | FestivalCountOutputTypeCountMissionsArgs
    photos?: boolean | FestivalCountOutputTypeCountPhotosArgs
  }

  // Custom InputTypes
  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalCountOutputType
     */
    select?: FestivalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeCountMissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissionWhereInput
  }

  /**
   * FestivalCountOutputType without action
   */
  export type FestivalCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FestivalPhotoWhereInput
  }


  /**
   * Count Type MissionCountOutputType
   */

  export type MissionCountOutputType = {
    photos: number
  }

  export type MissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photos?: boolean | MissionCountOutputTypeCountPhotosArgs
  }

  // Custom InputTypes
  /**
   * MissionCountOutputType without action
   */
  export type MissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionCountOutputType
     */
    select?: MissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MissionCountOutputType without action
   */
  export type MissionCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissionPhotoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Festival
   */

  export type AggregateFestival = {
    _count: FestivalCountAggregateOutputType | null
    _avg: FestivalAvgAggregateOutputType | null
    _sum: FestivalSumAggregateOutputType | null
    _min: FestivalMinAggregateOutputType | null
    _max: FestivalMaxAggregateOutputType | null
  }

  export type FestivalAvgAggregateOutputType = {
    id: number | null
  }

  export type FestivalSumAggregateOutputType = {
    id: number | null
  }

  export type FestivalMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdAt: Date | null
  }

  export type FestivalMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdAt: Date | null
  }

  export type FestivalCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    _all: number
  }


  export type FestivalAvgAggregateInputType = {
    id?: true
  }

  export type FestivalSumAggregateInputType = {
    id?: true
  }

  export type FestivalMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
  }

  export type FestivalMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
  }

  export type FestivalCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type FestivalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Festival to aggregate.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Festivals
    **/
    _count?: true | FestivalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FestivalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FestivalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FestivalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FestivalMaxAggregateInputType
  }

  export type GetFestivalAggregateType<T extends FestivalAggregateArgs> = {
        [P in keyof T & keyof AggregateFestival]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFestival[P]>
      : GetScalarType<T[P], AggregateFestival[P]>
  }




  export type FestivalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FestivalWhereInput
    orderBy?: FestivalOrderByWithAggregationInput | FestivalOrderByWithAggregationInput[]
    by: FestivalScalarFieldEnum[] | FestivalScalarFieldEnum
    having?: FestivalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FestivalCountAggregateInputType | true
    _avg?: FestivalAvgAggregateInputType
    _sum?: FestivalSumAggregateInputType
    _min?: FestivalMinAggregateInputType
    _max?: FestivalMaxAggregateInputType
  }

  export type FestivalGroupByOutputType = {
    id: number
    name: string
    description: string | null
    createdAt: Date
    _count: FestivalCountAggregateOutputType | null
    _avg: FestivalAvgAggregateOutputType | null
    _sum: FestivalSumAggregateOutputType | null
    _min: FestivalMinAggregateOutputType | null
    _max: FestivalMaxAggregateOutputType | null
  }

  type GetFestivalGroupByPayload<T extends FestivalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FestivalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FestivalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FestivalGroupByOutputType[P]>
            : GetScalarType<T[P], FestivalGroupByOutputType[P]>
        }
      >
    >


  export type FestivalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    token?: boolean | Festival$tokenArgs<ExtArgs>
    missions?: boolean | Festival$missionsArgs<ExtArgs>
    photos?: boolean | Festival$photosArgs<ExtArgs>
    _count?: boolean | FestivalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["festival"]>

  export type FestivalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["festival"]>

  export type FestivalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["festival"]>

  export type FestivalSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type FestivalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt", ExtArgs["result"]["festival"]>
  export type FestivalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    token?: boolean | Festival$tokenArgs<ExtArgs>
    missions?: boolean | Festival$missionsArgs<ExtArgs>
    photos?: boolean | Festival$photosArgs<ExtArgs>
    _count?: boolean | FestivalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FestivalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FestivalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FestivalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Festival"
    objects: {
      token: Prisma.$TokenPayload<ExtArgs> | null
      missions: Prisma.$MissionPayload<ExtArgs>[]
      photos: Prisma.$FestivalPhotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["festival"]>
    composites: {}
  }

  type FestivalGetPayload<S extends boolean | null | undefined | FestivalDefaultArgs> = $Result.GetResult<Prisma.$FestivalPayload, S>

  type FestivalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FestivalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FestivalCountAggregateInputType | true
    }

  export interface FestivalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Festival'], meta: { name: 'Festival' } }
    /**
     * Find zero or one Festival that matches the filter.
     * @param {FestivalFindUniqueArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FestivalFindUniqueArgs>(args: SelectSubset<T, FestivalFindUniqueArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Festival that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FestivalFindUniqueOrThrowArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FestivalFindUniqueOrThrowArgs>(args: SelectSubset<T, FestivalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Festival that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindFirstArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FestivalFindFirstArgs>(args?: SelectSubset<T, FestivalFindFirstArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Festival that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindFirstOrThrowArgs} args - Arguments to find a Festival
     * @example
     * // Get one Festival
     * const festival = await prisma.festival.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FestivalFindFirstOrThrowArgs>(args?: SelectSubset<T, FestivalFindFirstOrThrowArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Festivals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Festivals
     * const festivals = await prisma.festival.findMany()
     * 
     * // Get first 10 Festivals
     * const festivals = await prisma.festival.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const festivalWithIdOnly = await prisma.festival.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FestivalFindManyArgs>(args?: SelectSubset<T, FestivalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Festival.
     * @param {FestivalCreateArgs} args - Arguments to create a Festival.
     * @example
     * // Create one Festival
     * const Festival = await prisma.festival.create({
     *   data: {
     *     // ... data to create a Festival
     *   }
     * })
     * 
     */
    create<T extends FestivalCreateArgs>(args: SelectSubset<T, FestivalCreateArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Festivals.
     * @param {FestivalCreateManyArgs} args - Arguments to create many Festivals.
     * @example
     * // Create many Festivals
     * const festival = await prisma.festival.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FestivalCreateManyArgs>(args?: SelectSubset<T, FestivalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Festivals and returns the data saved in the database.
     * @param {FestivalCreateManyAndReturnArgs} args - Arguments to create many Festivals.
     * @example
     * // Create many Festivals
     * const festival = await prisma.festival.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Festivals and only return the `id`
     * const festivalWithIdOnly = await prisma.festival.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FestivalCreateManyAndReturnArgs>(args?: SelectSubset<T, FestivalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Festival.
     * @param {FestivalDeleteArgs} args - Arguments to delete one Festival.
     * @example
     * // Delete one Festival
     * const Festival = await prisma.festival.delete({
     *   where: {
     *     // ... filter to delete one Festival
     *   }
     * })
     * 
     */
    delete<T extends FestivalDeleteArgs>(args: SelectSubset<T, FestivalDeleteArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Festival.
     * @param {FestivalUpdateArgs} args - Arguments to update one Festival.
     * @example
     * // Update one Festival
     * const festival = await prisma.festival.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FestivalUpdateArgs>(args: SelectSubset<T, FestivalUpdateArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Festivals.
     * @param {FestivalDeleteManyArgs} args - Arguments to filter Festivals to delete.
     * @example
     * // Delete a few Festivals
     * const { count } = await prisma.festival.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FestivalDeleteManyArgs>(args?: SelectSubset<T, FestivalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Festivals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Festivals
     * const festival = await prisma.festival.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FestivalUpdateManyArgs>(args: SelectSubset<T, FestivalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Festivals and returns the data updated in the database.
     * @param {FestivalUpdateManyAndReturnArgs} args - Arguments to update many Festivals.
     * @example
     * // Update many Festivals
     * const festival = await prisma.festival.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Festivals and only return the `id`
     * const festivalWithIdOnly = await prisma.festival.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FestivalUpdateManyAndReturnArgs>(args: SelectSubset<T, FestivalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Festival.
     * @param {FestivalUpsertArgs} args - Arguments to update or create a Festival.
     * @example
     * // Update or create a Festival
     * const festival = await prisma.festival.upsert({
     *   create: {
     *     // ... data to create a Festival
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Festival we want to update
     *   }
     * })
     */
    upsert<T extends FestivalUpsertArgs>(args: SelectSubset<T, FestivalUpsertArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Festivals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalCountArgs} args - Arguments to filter Festivals to count.
     * @example
     * // Count the number of Festivals
     * const count = await prisma.festival.count({
     *   where: {
     *     // ... the filter for the Festivals we want to count
     *   }
     * })
    **/
    count<T extends FestivalCountArgs>(
      args?: Subset<T, FestivalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FestivalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Festival.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FestivalAggregateArgs>(args: Subset<T, FestivalAggregateArgs>): Prisma.PrismaPromise<GetFestivalAggregateType<T>>

    /**
     * Group by Festival.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FestivalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FestivalGroupByArgs['orderBy'] }
        : { orderBy?: FestivalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FestivalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFestivalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Festival model
   */
  readonly fields: FestivalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Festival.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FestivalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    token<T extends Festival$tokenArgs<ExtArgs> = {}>(args?: Subset<T, Festival$tokenArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    missions<T extends Festival$missionsArgs<ExtArgs> = {}>(args?: Subset<T, Festival$missionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    photos<T extends Festival$photosArgs<ExtArgs> = {}>(args?: Subset<T, Festival$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Festival model
   */
  interface FestivalFieldRefs {
    readonly id: FieldRef<"Festival", 'Int'>
    readonly name: FieldRef<"Festival", 'String'>
    readonly description: FieldRef<"Festival", 'String'>
    readonly createdAt: FieldRef<"Festival", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Festival findUnique
   */
  export type FestivalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival findUniqueOrThrow
   */
  export type FestivalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival findFirst
   */
  export type FestivalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festivals.
     */
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival findFirstOrThrow
   */
  export type FestivalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festival to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festivals.
     */
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival findMany
   */
  export type FestivalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter, which Festivals to fetch.
     */
    where?: FestivalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festivals to fetch.
     */
    orderBy?: FestivalOrderByWithRelationInput | FestivalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Festivals.
     */
    cursor?: FestivalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festivals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festivals.
     */
    skip?: number
    distinct?: FestivalScalarFieldEnum | FestivalScalarFieldEnum[]
  }

  /**
   * Festival create
   */
  export type FestivalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The data needed to create a Festival.
     */
    data: XOR<FestivalCreateInput, FestivalUncheckedCreateInput>
  }

  /**
   * Festival createMany
   */
  export type FestivalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Festivals.
     */
    data: FestivalCreateManyInput | FestivalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Festival createManyAndReturn
   */
  export type FestivalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * The data used to create many Festivals.
     */
    data: FestivalCreateManyInput | FestivalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Festival update
   */
  export type FestivalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The data needed to update a Festival.
     */
    data: XOR<FestivalUpdateInput, FestivalUncheckedUpdateInput>
    /**
     * Choose, which Festival to update.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival updateMany
   */
  export type FestivalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Festivals.
     */
    data: XOR<FestivalUpdateManyMutationInput, FestivalUncheckedUpdateManyInput>
    /**
     * Filter which Festivals to update
     */
    where?: FestivalWhereInput
    /**
     * Limit how many Festivals to update.
     */
    limit?: number
  }

  /**
   * Festival updateManyAndReturn
   */
  export type FestivalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * The data used to update Festivals.
     */
    data: XOR<FestivalUpdateManyMutationInput, FestivalUncheckedUpdateManyInput>
    /**
     * Filter which Festivals to update
     */
    where?: FestivalWhereInput
    /**
     * Limit how many Festivals to update.
     */
    limit?: number
  }

  /**
   * Festival upsert
   */
  export type FestivalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * The filter to search for the Festival to update in case it exists.
     */
    where: FestivalWhereUniqueInput
    /**
     * In case the Festival found by the `where` argument doesn't exist, create a new Festival with this data.
     */
    create: XOR<FestivalCreateInput, FestivalUncheckedCreateInput>
    /**
     * In case the Festival was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FestivalUpdateInput, FestivalUncheckedUpdateInput>
  }

  /**
   * Festival delete
   */
  export type FestivalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
    /**
     * Filter which Festival to delete.
     */
    where: FestivalWhereUniqueInput
  }

  /**
   * Festival deleteMany
   */
  export type FestivalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Festivals to delete
     */
    where?: FestivalWhereInput
    /**
     * Limit how many Festivals to delete.
     */
    limit?: number
  }

  /**
   * Festival.token
   */
  export type Festival$tokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    where?: TokenWhereInput
  }

  /**
   * Festival.missions
   */
  export type Festival$missionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    where?: MissionWhereInput
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    cursor?: MissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MissionScalarFieldEnum | MissionScalarFieldEnum[]
  }

  /**
   * Festival.photos
   */
  export type Festival$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    where?: FestivalPhotoWhereInput
    orderBy?: FestivalPhotoOrderByWithRelationInput | FestivalPhotoOrderByWithRelationInput[]
    cursor?: FestivalPhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FestivalPhotoScalarFieldEnum | FestivalPhotoScalarFieldEnum[]
  }

  /**
   * Festival without action
   */
  export type FestivalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festival
     */
    select?: FestivalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festival
     */
    omit?: FestivalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    id: number | null
    festivalId: number | null
    decimals: number | null
    supply: number | null
  }

  export type TokenSumAggregateOutputType = {
    id: number | null
    festivalId: number | null
    decimals: number | null
    supply: bigint | null
  }

  export type TokenMinAggregateOutputType = {
    id: number | null
    festivalId: number | null
    mintAddress: string | null
    symbol: string | null
    name: string | null
    decimals: number | null
    supply: bigint | null
  }

  export type TokenMaxAggregateOutputType = {
    id: number | null
    festivalId: number | null
    mintAddress: string | null
    symbol: string | null
    name: string | null
    decimals: number | null
    supply: bigint | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    festivalId: number
    mintAddress: number
    symbol: number
    name: number
    decimals: number
    supply: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    id?: true
    festivalId?: true
    decimals?: true
    supply?: true
  }

  export type TokenSumAggregateInputType = {
    id?: true
    festivalId?: true
    decimals?: true
    supply?: true
  }

  export type TokenMinAggregateInputType = {
    id?: true
    festivalId?: true
    mintAddress?: true
    symbol?: true
    name?: true
    decimals?: true
    supply?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    festivalId?: true
    mintAddress?: true
    symbol?: true
    name?: true
    decimals?: true
    supply?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    festivalId?: true
    mintAddress?: true
    symbol?: true
    name?: true
    decimals?: true
    supply?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: number
    festivalId: number
    mintAddress: string
    symbol: string
    name: string
    decimals: number
    supply: bigint
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    mintAddress?: boolean
    symbol?: boolean
    name?: boolean
    decimals?: boolean
    supply?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    mintAddress?: boolean
    symbol?: boolean
    name?: boolean
    decimals?: boolean
    supply?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    mintAddress?: boolean
    symbol?: boolean
    name?: boolean
    decimals?: boolean
    supply?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    festivalId?: boolean
    mintAddress?: boolean
    symbol?: boolean
    name?: boolean
    decimals?: boolean
    supply?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "festivalId" | "mintAddress" | "symbol" | "name" | "decimals" | "supply", ExtArgs["result"]["token"]>
  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }
  export type TokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }
  export type TokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {
      festival: Prisma.$FestivalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      festivalId: number
      mintAddress: string
      symbol: string
      name: string
      decimals: number
      supply: bigint
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    festival<T extends FestivalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FestivalDefaultArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'Int'>
    readonly festivalId: FieldRef<"Token", 'Int'>
    readonly mintAddress: FieldRef<"Token", 'String'>
    readonly symbol: FieldRef<"Token", 'String'>
    readonly name: FieldRef<"Token", 'String'>
    readonly decimals: FieldRef<"Token", 'Int'>
    readonly supply: FieldRef<"Token", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
  }


  /**
   * Model Mission
   */

  export type AggregateMission = {
    _count: MissionCountAggregateOutputType | null
    _avg: MissionAvgAggregateOutputType | null
    _sum: MissionSumAggregateOutputType | null
    _min: MissionMinAggregateOutputType | null
    _max: MissionMaxAggregateOutputType | null
  }

  export type MissionAvgAggregateOutputType = {
    id: number | null
    festivalId: number | null
    rewardAmount: number | null
  }

  export type MissionSumAggregateOutputType = {
    id: number | null
    festivalId: number | null
    rewardAmount: bigint | null
  }

  export type MissionMinAggregateOutputType = {
    id: number | null
    festivalId: number | null
    title: string | null
    description: string | null
    rewardAmount: bigint | null
    createdAt: Date | null
  }

  export type MissionMaxAggregateOutputType = {
    id: number | null
    festivalId: number | null
    title: string | null
    description: string | null
    rewardAmount: bigint | null
    createdAt: Date | null
  }

  export type MissionCountAggregateOutputType = {
    id: number
    festivalId: number
    title: number
    description: number
    rewardAmount: number
    createdAt: number
    _all: number
  }


  export type MissionAvgAggregateInputType = {
    id?: true
    festivalId?: true
    rewardAmount?: true
  }

  export type MissionSumAggregateInputType = {
    id?: true
    festivalId?: true
    rewardAmount?: true
  }

  export type MissionMinAggregateInputType = {
    id?: true
    festivalId?: true
    title?: true
    description?: true
    rewardAmount?: true
    createdAt?: true
  }

  export type MissionMaxAggregateInputType = {
    id?: true
    festivalId?: true
    title?: true
    description?: true
    rewardAmount?: true
    createdAt?: true
  }

  export type MissionCountAggregateInputType = {
    id?: true
    festivalId?: true
    title?: true
    description?: true
    rewardAmount?: true
    createdAt?: true
    _all?: true
  }

  export type MissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mission to aggregate.
     */
    where?: MissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Missions to fetch.
     */
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Missions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Missions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Missions
    **/
    _count?: true | MissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MissionMaxAggregateInputType
  }

  export type GetMissionAggregateType<T extends MissionAggregateArgs> = {
        [P in keyof T & keyof AggregateMission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMission[P]>
      : GetScalarType<T[P], AggregateMission[P]>
  }




  export type MissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissionWhereInput
    orderBy?: MissionOrderByWithAggregationInput | MissionOrderByWithAggregationInput[]
    by: MissionScalarFieldEnum[] | MissionScalarFieldEnum
    having?: MissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MissionCountAggregateInputType | true
    _avg?: MissionAvgAggregateInputType
    _sum?: MissionSumAggregateInputType
    _min?: MissionMinAggregateInputType
    _max?: MissionMaxAggregateInputType
  }

  export type MissionGroupByOutputType = {
    id: number
    festivalId: number
    title: string
    description: string | null
    rewardAmount: bigint
    createdAt: Date
    _count: MissionCountAggregateOutputType | null
    _avg: MissionAvgAggregateOutputType | null
    _sum: MissionSumAggregateOutputType | null
    _min: MissionMinAggregateOutputType | null
    _max: MissionMaxAggregateOutputType | null
  }

  type GetMissionGroupByPayload<T extends MissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MissionGroupByOutputType[P]>
            : GetScalarType<T[P], MissionGroupByOutputType[P]>
        }
      >
    >


  export type MissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    title?: boolean
    description?: boolean
    rewardAmount?: boolean
    createdAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    photos?: boolean | Mission$photosArgs<ExtArgs>
    _count?: boolean | MissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mission"]>

  export type MissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    title?: boolean
    description?: boolean
    rewardAmount?: boolean
    createdAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mission"]>

  export type MissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    title?: boolean
    description?: boolean
    rewardAmount?: boolean
    createdAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mission"]>

  export type MissionSelectScalar = {
    id?: boolean
    festivalId?: boolean
    title?: boolean
    description?: boolean
    rewardAmount?: boolean
    createdAt?: boolean
  }

  export type MissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "festivalId" | "title" | "description" | "rewardAmount" | "createdAt", ExtArgs["result"]["mission"]>
  export type MissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
    photos?: boolean | Mission$photosArgs<ExtArgs>
    _count?: boolean | MissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }
  export type MissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }

  export type $MissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mission"
    objects: {
      festival: Prisma.$FestivalPayload<ExtArgs>
      photos: Prisma.$MissionPhotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      festivalId: number
      title: string
      description: string | null
      rewardAmount: bigint
      createdAt: Date
    }, ExtArgs["result"]["mission"]>
    composites: {}
  }

  type MissionGetPayload<S extends boolean | null | undefined | MissionDefaultArgs> = $Result.GetResult<Prisma.$MissionPayload, S>

  type MissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MissionCountAggregateInputType | true
    }

  export interface MissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mission'], meta: { name: 'Mission' } }
    /**
     * Find zero or one Mission that matches the filter.
     * @param {MissionFindUniqueArgs} args - Arguments to find a Mission
     * @example
     * // Get one Mission
     * const mission = await prisma.mission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MissionFindUniqueArgs>(args: SelectSubset<T, MissionFindUniqueArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MissionFindUniqueOrThrowArgs} args - Arguments to find a Mission
     * @example
     * // Get one Mission
     * const mission = await prisma.mission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MissionFindUniqueOrThrowArgs>(args: SelectSubset<T, MissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionFindFirstArgs} args - Arguments to find a Mission
     * @example
     * // Get one Mission
     * const mission = await prisma.mission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MissionFindFirstArgs>(args?: SelectSubset<T, MissionFindFirstArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionFindFirstOrThrowArgs} args - Arguments to find a Mission
     * @example
     * // Get one Mission
     * const mission = await prisma.mission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MissionFindFirstOrThrowArgs>(args?: SelectSubset<T, MissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Missions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Missions
     * const missions = await prisma.mission.findMany()
     * 
     * // Get first 10 Missions
     * const missions = await prisma.mission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const missionWithIdOnly = await prisma.mission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MissionFindManyArgs>(args?: SelectSubset<T, MissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mission.
     * @param {MissionCreateArgs} args - Arguments to create a Mission.
     * @example
     * // Create one Mission
     * const Mission = await prisma.mission.create({
     *   data: {
     *     // ... data to create a Mission
     *   }
     * })
     * 
     */
    create<T extends MissionCreateArgs>(args: SelectSubset<T, MissionCreateArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Missions.
     * @param {MissionCreateManyArgs} args - Arguments to create many Missions.
     * @example
     * // Create many Missions
     * const mission = await prisma.mission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MissionCreateManyArgs>(args?: SelectSubset<T, MissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Missions and returns the data saved in the database.
     * @param {MissionCreateManyAndReturnArgs} args - Arguments to create many Missions.
     * @example
     * // Create many Missions
     * const mission = await prisma.mission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Missions and only return the `id`
     * const missionWithIdOnly = await prisma.mission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MissionCreateManyAndReturnArgs>(args?: SelectSubset<T, MissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mission.
     * @param {MissionDeleteArgs} args - Arguments to delete one Mission.
     * @example
     * // Delete one Mission
     * const Mission = await prisma.mission.delete({
     *   where: {
     *     // ... filter to delete one Mission
     *   }
     * })
     * 
     */
    delete<T extends MissionDeleteArgs>(args: SelectSubset<T, MissionDeleteArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mission.
     * @param {MissionUpdateArgs} args - Arguments to update one Mission.
     * @example
     * // Update one Mission
     * const mission = await prisma.mission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MissionUpdateArgs>(args: SelectSubset<T, MissionUpdateArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Missions.
     * @param {MissionDeleteManyArgs} args - Arguments to filter Missions to delete.
     * @example
     * // Delete a few Missions
     * const { count } = await prisma.mission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MissionDeleteManyArgs>(args?: SelectSubset<T, MissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Missions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Missions
     * const mission = await prisma.mission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MissionUpdateManyArgs>(args: SelectSubset<T, MissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Missions and returns the data updated in the database.
     * @param {MissionUpdateManyAndReturnArgs} args - Arguments to update many Missions.
     * @example
     * // Update many Missions
     * const mission = await prisma.mission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Missions and only return the `id`
     * const missionWithIdOnly = await prisma.mission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MissionUpdateManyAndReturnArgs>(args: SelectSubset<T, MissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mission.
     * @param {MissionUpsertArgs} args - Arguments to update or create a Mission.
     * @example
     * // Update or create a Mission
     * const mission = await prisma.mission.upsert({
     *   create: {
     *     // ... data to create a Mission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mission we want to update
     *   }
     * })
     */
    upsert<T extends MissionUpsertArgs>(args: SelectSubset<T, MissionUpsertArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Missions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionCountArgs} args - Arguments to filter Missions to count.
     * @example
     * // Count the number of Missions
     * const count = await prisma.mission.count({
     *   where: {
     *     // ... the filter for the Missions we want to count
     *   }
     * })
    **/
    count<T extends MissionCountArgs>(
      args?: Subset<T, MissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MissionAggregateArgs>(args: Subset<T, MissionAggregateArgs>): Prisma.PrismaPromise<GetMissionAggregateType<T>>

    /**
     * Group by Mission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MissionGroupByArgs['orderBy'] }
        : { orderBy?: MissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mission model
   */
  readonly fields: MissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    festival<T extends FestivalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FestivalDefaultArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    photos<T extends Mission$photosArgs<ExtArgs> = {}>(args?: Subset<T, Mission$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mission model
   */
  interface MissionFieldRefs {
    readonly id: FieldRef<"Mission", 'Int'>
    readonly festivalId: FieldRef<"Mission", 'Int'>
    readonly title: FieldRef<"Mission", 'String'>
    readonly description: FieldRef<"Mission", 'String'>
    readonly rewardAmount: FieldRef<"Mission", 'BigInt'>
    readonly createdAt: FieldRef<"Mission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mission findUnique
   */
  export type MissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Mission to fetch.
     */
    where: MissionWhereUniqueInput
  }

  /**
   * Mission findUniqueOrThrow
   */
  export type MissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Mission to fetch.
     */
    where: MissionWhereUniqueInput
  }

  /**
   * Mission findFirst
   */
  export type MissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Mission to fetch.
     */
    where?: MissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Missions to fetch.
     */
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Missions.
     */
    cursor?: MissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Missions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Missions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Missions.
     */
    distinct?: MissionScalarFieldEnum | MissionScalarFieldEnum[]
  }

  /**
   * Mission findFirstOrThrow
   */
  export type MissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Mission to fetch.
     */
    where?: MissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Missions to fetch.
     */
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Missions.
     */
    cursor?: MissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Missions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Missions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Missions.
     */
    distinct?: MissionScalarFieldEnum | MissionScalarFieldEnum[]
  }

  /**
   * Mission findMany
   */
  export type MissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter, which Missions to fetch.
     */
    where?: MissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Missions to fetch.
     */
    orderBy?: MissionOrderByWithRelationInput | MissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Missions.
     */
    cursor?: MissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Missions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Missions.
     */
    skip?: number
    distinct?: MissionScalarFieldEnum | MissionScalarFieldEnum[]
  }

  /**
   * Mission create
   */
  export type MissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Mission.
     */
    data: XOR<MissionCreateInput, MissionUncheckedCreateInput>
  }

  /**
   * Mission createMany
   */
  export type MissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Missions.
     */
    data: MissionCreateManyInput | MissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mission createManyAndReturn
   */
  export type MissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * The data used to create many Missions.
     */
    data: MissionCreateManyInput | MissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mission update
   */
  export type MissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Mission.
     */
    data: XOR<MissionUpdateInput, MissionUncheckedUpdateInput>
    /**
     * Choose, which Mission to update.
     */
    where: MissionWhereUniqueInput
  }

  /**
   * Mission updateMany
   */
  export type MissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Missions.
     */
    data: XOR<MissionUpdateManyMutationInput, MissionUncheckedUpdateManyInput>
    /**
     * Filter which Missions to update
     */
    where?: MissionWhereInput
    /**
     * Limit how many Missions to update.
     */
    limit?: number
  }

  /**
   * Mission updateManyAndReturn
   */
  export type MissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * The data used to update Missions.
     */
    data: XOR<MissionUpdateManyMutationInput, MissionUncheckedUpdateManyInput>
    /**
     * Filter which Missions to update
     */
    where?: MissionWhereInput
    /**
     * Limit how many Missions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mission upsert
   */
  export type MissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Mission to update in case it exists.
     */
    where: MissionWhereUniqueInput
    /**
     * In case the Mission found by the `where` argument doesn't exist, create a new Mission with this data.
     */
    create: XOR<MissionCreateInput, MissionUncheckedCreateInput>
    /**
     * In case the Mission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MissionUpdateInput, MissionUncheckedUpdateInput>
  }

  /**
   * Mission delete
   */
  export type MissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
    /**
     * Filter which Mission to delete.
     */
    where: MissionWhereUniqueInput
  }

  /**
   * Mission deleteMany
   */
  export type MissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Missions to delete
     */
    where?: MissionWhereInput
    /**
     * Limit how many Missions to delete.
     */
    limit?: number
  }

  /**
   * Mission.photos
   */
  export type Mission$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    where?: MissionPhotoWhereInput
    orderBy?: MissionPhotoOrderByWithRelationInput | MissionPhotoOrderByWithRelationInput[]
    cursor?: MissionPhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MissionPhotoScalarFieldEnum | MissionPhotoScalarFieldEnum[]
  }

  /**
   * Mission without action
   */
  export type MissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mission
     */
    select?: MissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mission
     */
    omit?: MissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionInclude<ExtArgs> | null
  }


  /**
   * Model FestivalPhoto
   */

  export type AggregateFestivalPhoto = {
    _count: FestivalPhotoCountAggregateOutputType | null
    _avg: FestivalPhotoAvgAggregateOutputType | null
    _sum: FestivalPhotoSumAggregateOutputType | null
    _min: FestivalPhotoMinAggregateOutputType | null
    _max: FestivalPhotoMaxAggregateOutputType | null
  }

  export type FestivalPhotoAvgAggregateOutputType = {
    id: number | null
    festivalId: number | null
  }

  export type FestivalPhotoSumAggregateOutputType = {
    id: number | null
    festivalId: number | null
  }

  export type FestivalPhotoMinAggregateOutputType = {
    id: number | null
    festivalId: number | null
    photo: Uint8Array | null
    uploadedAt: Date | null
  }

  export type FestivalPhotoMaxAggregateOutputType = {
    id: number | null
    festivalId: number | null
    photo: Uint8Array | null
    uploadedAt: Date | null
  }

  export type FestivalPhotoCountAggregateOutputType = {
    id: number
    festivalId: number
    photo: number
    uploadedAt: number
    _all: number
  }


  export type FestivalPhotoAvgAggregateInputType = {
    id?: true
    festivalId?: true
  }

  export type FestivalPhotoSumAggregateInputType = {
    id?: true
    festivalId?: true
  }

  export type FestivalPhotoMinAggregateInputType = {
    id?: true
    festivalId?: true
    photo?: true
    uploadedAt?: true
  }

  export type FestivalPhotoMaxAggregateInputType = {
    id?: true
    festivalId?: true
    photo?: true
    uploadedAt?: true
  }

  export type FestivalPhotoCountAggregateInputType = {
    id?: true
    festivalId?: true
    photo?: true
    uploadedAt?: true
    _all?: true
  }

  export type FestivalPhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FestivalPhoto to aggregate.
     */
    where?: FestivalPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FestivalPhotos to fetch.
     */
    orderBy?: FestivalPhotoOrderByWithRelationInput | FestivalPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FestivalPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FestivalPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FestivalPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FestivalPhotos
    **/
    _count?: true | FestivalPhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FestivalPhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FestivalPhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FestivalPhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FestivalPhotoMaxAggregateInputType
  }

  export type GetFestivalPhotoAggregateType<T extends FestivalPhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateFestivalPhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFestivalPhoto[P]>
      : GetScalarType<T[P], AggregateFestivalPhoto[P]>
  }




  export type FestivalPhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FestivalPhotoWhereInput
    orderBy?: FestivalPhotoOrderByWithAggregationInput | FestivalPhotoOrderByWithAggregationInput[]
    by: FestivalPhotoScalarFieldEnum[] | FestivalPhotoScalarFieldEnum
    having?: FestivalPhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FestivalPhotoCountAggregateInputType | true
    _avg?: FestivalPhotoAvgAggregateInputType
    _sum?: FestivalPhotoSumAggregateInputType
    _min?: FestivalPhotoMinAggregateInputType
    _max?: FestivalPhotoMaxAggregateInputType
  }

  export type FestivalPhotoGroupByOutputType = {
    id: number
    festivalId: number
    photo: Uint8Array
    uploadedAt: Date
    _count: FestivalPhotoCountAggregateOutputType | null
    _avg: FestivalPhotoAvgAggregateOutputType | null
    _sum: FestivalPhotoSumAggregateOutputType | null
    _min: FestivalPhotoMinAggregateOutputType | null
    _max: FestivalPhotoMaxAggregateOutputType | null
  }

  type GetFestivalPhotoGroupByPayload<T extends FestivalPhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FestivalPhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FestivalPhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FestivalPhotoGroupByOutputType[P]>
            : GetScalarType<T[P], FestivalPhotoGroupByOutputType[P]>
        }
      >
    >


  export type FestivalPhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    photo?: boolean
    uploadedAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["festivalPhoto"]>

  export type FestivalPhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    photo?: boolean
    uploadedAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["festivalPhoto"]>

  export type FestivalPhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    festivalId?: boolean
    photo?: boolean
    uploadedAt?: boolean
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["festivalPhoto"]>

  export type FestivalPhotoSelectScalar = {
    id?: boolean
    festivalId?: boolean
    photo?: boolean
    uploadedAt?: boolean
  }

  export type FestivalPhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "festivalId" | "photo" | "uploadedAt", ExtArgs["result"]["festivalPhoto"]>
  export type FestivalPhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }
  export type FestivalPhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }
  export type FestivalPhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    festival?: boolean | FestivalDefaultArgs<ExtArgs>
  }

  export type $FestivalPhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FestivalPhoto"
    objects: {
      festival: Prisma.$FestivalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      festivalId: number
      photo: Uint8Array
      uploadedAt: Date
    }, ExtArgs["result"]["festivalPhoto"]>
    composites: {}
  }

  type FestivalPhotoGetPayload<S extends boolean | null | undefined | FestivalPhotoDefaultArgs> = $Result.GetResult<Prisma.$FestivalPhotoPayload, S>

  type FestivalPhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FestivalPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FestivalPhotoCountAggregateInputType | true
    }

  export interface FestivalPhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FestivalPhoto'], meta: { name: 'FestivalPhoto' } }
    /**
     * Find zero or one FestivalPhoto that matches the filter.
     * @param {FestivalPhotoFindUniqueArgs} args - Arguments to find a FestivalPhoto
     * @example
     * // Get one FestivalPhoto
     * const festivalPhoto = await prisma.festivalPhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FestivalPhotoFindUniqueArgs>(args: SelectSubset<T, FestivalPhotoFindUniqueArgs<ExtArgs>>): Prisma__FestivalPhotoClient<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FestivalPhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FestivalPhotoFindUniqueOrThrowArgs} args - Arguments to find a FestivalPhoto
     * @example
     * // Get one FestivalPhoto
     * const festivalPhoto = await prisma.festivalPhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FestivalPhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, FestivalPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FestivalPhotoClient<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FestivalPhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalPhotoFindFirstArgs} args - Arguments to find a FestivalPhoto
     * @example
     * // Get one FestivalPhoto
     * const festivalPhoto = await prisma.festivalPhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FestivalPhotoFindFirstArgs>(args?: SelectSubset<T, FestivalPhotoFindFirstArgs<ExtArgs>>): Prisma__FestivalPhotoClient<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FestivalPhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalPhotoFindFirstOrThrowArgs} args - Arguments to find a FestivalPhoto
     * @example
     * // Get one FestivalPhoto
     * const festivalPhoto = await prisma.festivalPhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FestivalPhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, FestivalPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__FestivalPhotoClient<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FestivalPhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalPhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FestivalPhotos
     * const festivalPhotos = await prisma.festivalPhoto.findMany()
     * 
     * // Get first 10 FestivalPhotos
     * const festivalPhotos = await prisma.festivalPhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const festivalPhotoWithIdOnly = await prisma.festivalPhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FestivalPhotoFindManyArgs>(args?: SelectSubset<T, FestivalPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FestivalPhoto.
     * @param {FestivalPhotoCreateArgs} args - Arguments to create a FestivalPhoto.
     * @example
     * // Create one FestivalPhoto
     * const FestivalPhoto = await prisma.festivalPhoto.create({
     *   data: {
     *     // ... data to create a FestivalPhoto
     *   }
     * })
     * 
     */
    create<T extends FestivalPhotoCreateArgs>(args: SelectSubset<T, FestivalPhotoCreateArgs<ExtArgs>>): Prisma__FestivalPhotoClient<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FestivalPhotos.
     * @param {FestivalPhotoCreateManyArgs} args - Arguments to create many FestivalPhotos.
     * @example
     * // Create many FestivalPhotos
     * const festivalPhoto = await prisma.festivalPhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FestivalPhotoCreateManyArgs>(args?: SelectSubset<T, FestivalPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FestivalPhotos and returns the data saved in the database.
     * @param {FestivalPhotoCreateManyAndReturnArgs} args - Arguments to create many FestivalPhotos.
     * @example
     * // Create many FestivalPhotos
     * const festivalPhoto = await prisma.festivalPhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FestivalPhotos and only return the `id`
     * const festivalPhotoWithIdOnly = await prisma.festivalPhoto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FestivalPhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, FestivalPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FestivalPhoto.
     * @param {FestivalPhotoDeleteArgs} args - Arguments to delete one FestivalPhoto.
     * @example
     * // Delete one FestivalPhoto
     * const FestivalPhoto = await prisma.festivalPhoto.delete({
     *   where: {
     *     // ... filter to delete one FestivalPhoto
     *   }
     * })
     * 
     */
    delete<T extends FestivalPhotoDeleteArgs>(args: SelectSubset<T, FestivalPhotoDeleteArgs<ExtArgs>>): Prisma__FestivalPhotoClient<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FestivalPhoto.
     * @param {FestivalPhotoUpdateArgs} args - Arguments to update one FestivalPhoto.
     * @example
     * // Update one FestivalPhoto
     * const festivalPhoto = await prisma.festivalPhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FestivalPhotoUpdateArgs>(args: SelectSubset<T, FestivalPhotoUpdateArgs<ExtArgs>>): Prisma__FestivalPhotoClient<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FestivalPhotos.
     * @param {FestivalPhotoDeleteManyArgs} args - Arguments to filter FestivalPhotos to delete.
     * @example
     * // Delete a few FestivalPhotos
     * const { count } = await prisma.festivalPhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FestivalPhotoDeleteManyArgs>(args?: SelectSubset<T, FestivalPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FestivalPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalPhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FestivalPhotos
     * const festivalPhoto = await prisma.festivalPhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FestivalPhotoUpdateManyArgs>(args: SelectSubset<T, FestivalPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FestivalPhotos and returns the data updated in the database.
     * @param {FestivalPhotoUpdateManyAndReturnArgs} args - Arguments to update many FestivalPhotos.
     * @example
     * // Update many FestivalPhotos
     * const festivalPhoto = await prisma.festivalPhoto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FestivalPhotos and only return the `id`
     * const festivalPhotoWithIdOnly = await prisma.festivalPhoto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FestivalPhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, FestivalPhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FestivalPhoto.
     * @param {FestivalPhotoUpsertArgs} args - Arguments to update or create a FestivalPhoto.
     * @example
     * // Update or create a FestivalPhoto
     * const festivalPhoto = await prisma.festivalPhoto.upsert({
     *   create: {
     *     // ... data to create a FestivalPhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FestivalPhoto we want to update
     *   }
     * })
     */
    upsert<T extends FestivalPhotoUpsertArgs>(args: SelectSubset<T, FestivalPhotoUpsertArgs<ExtArgs>>): Prisma__FestivalPhotoClient<$Result.GetResult<Prisma.$FestivalPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FestivalPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalPhotoCountArgs} args - Arguments to filter FestivalPhotos to count.
     * @example
     * // Count the number of FestivalPhotos
     * const count = await prisma.festivalPhoto.count({
     *   where: {
     *     // ... the filter for the FestivalPhotos we want to count
     *   }
     * })
    **/
    count<T extends FestivalPhotoCountArgs>(
      args?: Subset<T, FestivalPhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FestivalPhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FestivalPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalPhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FestivalPhotoAggregateArgs>(args: Subset<T, FestivalPhotoAggregateArgs>): Prisma.PrismaPromise<GetFestivalPhotoAggregateType<T>>

    /**
     * Group by FestivalPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestivalPhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FestivalPhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FestivalPhotoGroupByArgs['orderBy'] }
        : { orderBy?: FestivalPhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FestivalPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFestivalPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FestivalPhoto model
   */
  readonly fields: FestivalPhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FestivalPhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FestivalPhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    festival<T extends FestivalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FestivalDefaultArgs<ExtArgs>>): Prisma__FestivalClient<$Result.GetResult<Prisma.$FestivalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FestivalPhoto model
   */
  interface FestivalPhotoFieldRefs {
    readonly id: FieldRef<"FestivalPhoto", 'Int'>
    readonly festivalId: FieldRef<"FestivalPhoto", 'Int'>
    readonly photo: FieldRef<"FestivalPhoto", 'Bytes'>
    readonly uploadedAt: FieldRef<"FestivalPhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FestivalPhoto findUnique
   */
  export type FestivalPhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * Filter, which FestivalPhoto to fetch.
     */
    where: FestivalPhotoWhereUniqueInput
  }

  /**
   * FestivalPhoto findUniqueOrThrow
   */
  export type FestivalPhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * Filter, which FestivalPhoto to fetch.
     */
    where: FestivalPhotoWhereUniqueInput
  }

  /**
   * FestivalPhoto findFirst
   */
  export type FestivalPhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * Filter, which FestivalPhoto to fetch.
     */
    where?: FestivalPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FestivalPhotos to fetch.
     */
    orderBy?: FestivalPhotoOrderByWithRelationInput | FestivalPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FestivalPhotos.
     */
    cursor?: FestivalPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FestivalPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FestivalPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FestivalPhotos.
     */
    distinct?: FestivalPhotoScalarFieldEnum | FestivalPhotoScalarFieldEnum[]
  }

  /**
   * FestivalPhoto findFirstOrThrow
   */
  export type FestivalPhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * Filter, which FestivalPhoto to fetch.
     */
    where?: FestivalPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FestivalPhotos to fetch.
     */
    orderBy?: FestivalPhotoOrderByWithRelationInput | FestivalPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FestivalPhotos.
     */
    cursor?: FestivalPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FestivalPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FestivalPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FestivalPhotos.
     */
    distinct?: FestivalPhotoScalarFieldEnum | FestivalPhotoScalarFieldEnum[]
  }

  /**
   * FestivalPhoto findMany
   */
  export type FestivalPhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * Filter, which FestivalPhotos to fetch.
     */
    where?: FestivalPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FestivalPhotos to fetch.
     */
    orderBy?: FestivalPhotoOrderByWithRelationInput | FestivalPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FestivalPhotos.
     */
    cursor?: FestivalPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FestivalPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FestivalPhotos.
     */
    skip?: number
    distinct?: FestivalPhotoScalarFieldEnum | FestivalPhotoScalarFieldEnum[]
  }

  /**
   * FestivalPhoto create
   */
  export type FestivalPhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a FestivalPhoto.
     */
    data: XOR<FestivalPhotoCreateInput, FestivalPhotoUncheckedCreateInput>
  }

  /**
   * FestivalPhoto createMany
   */
  export type FestivalPhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FestivalPhotos.
     */
    data: FestivalPhotoCreateManyInput | FestivalPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FestivalPhoto createManyAndReturn
   */
  export type FestivalPhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * The data used to create many FestivalPhotos.
     */
    data: FestivalPhotoCreateManyInput | FestivalPhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FestivalPhoto update
   */
  export type FestivalPhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a FestivalPhoto.
     */
    data: XOR<FestivalPhotoUpdateInput, FestivalPhotoUncheckedUpdateInput>
    /**
     * Choose, which FestivalPhoto to update.
     */
    where: FestivalPhotoWhereUniqueInput
  }

  /**
   * FestivalPhoto updateMany
   */
  export type FestivalPhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FestivalPhotos.
     */
    data: XOR<FestivalPhotoUpdateManyMutationInput, FestivalPhotoUncheckedUpdateManyInput>
    /**
     * Filter which FestivalPhotos to update
     */
    where?: FestivalPhotoWhereInput
    /**
     * Limit how many FestivalPhotos to update.
     */
    limit?: number
  }

  /**
   * FestivalPhoto updateManyAndReturn
   */
  export type FestivalPhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * The data used to update FestivalPhotos.
     */
    data: XOR<FestivalPhotoUpdateManyMutationInput, FestivalPhotoUncheckedUpdateManyInput>
    /**
     * Filter which FestivalPhotos to update
     */
    where?: FestivalPhotoWhereInput
    /**
     * Limit how many FestivalPhotos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FestivalPhoto upsert
   */
  export type FestivalPhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the FestivalPhoto to update in case it exists.
     */
    where: FestivalPhotoWhereUniqueInput
    /**
     * In case the FestivalPhoto found by the `where` argument doesn't exist, create a new FestivalPhoto with this data.
     */
    create: XOR<FestivalPhotoCreateInput, FestivalPhotoUncheckedCreateInput>
    /**
     * In case the FestivalPhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FestivalPhotoUpdateInput, FestivalPhotoUncheckedUpdateInput>
  }

  /**
   * FestivalPhoto delete
   */
  export type FestivalPhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
    /**
     * Filter which FestivalPhoto to delete.
     */
    where: FestivalPhotoWhereUniqueInput
  }

  /**
   * FestivalPhoto deleteMany
   */
  export type FestivalPhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FestivalPhotos to delete
     */
    where?: FestivalPhotoWhereInput
    /**
     * Limit how many FestivalPhotos to delete.
     */
    limit?: number
  }

  /**
   * FestivalPhoto without action
   */
  export type FestivalPhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FestivalPhoto
     */
    select?: FestivalPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FestivalPhoto
     */
    omit?: FestivalPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FestivalPhotoInclude<ExtArgs> | null
  }


  /**
   * Model MissionPhoto
   */

  export type AggregateMissionPhoto = {
    _count: MissionPhotoCountAggregateOutputType | null
    _avg: MissionPhotoAvgAggregateOutputType | null
    _sum: MissionPhotoSumAggregateOutputType | null
    _min: MissionPhotoMinAggregateOutputType | null
    _max: MissionPhotoMaxAggregateOutputType | null
  }

  export type MissionPhotoAvgAggregateOutputType = {
    id: number | null
    missionId: number | null
  }

  export type MissionPhotoSumAggregateOutputType = {
    id: number | null
    missionId: number | null
  }

  export type MissionPhotoMinAggregateOutputType = {
    id: number | null
    missionId: number | null
    photo: Uint8Array | null
    uploadedAt: Date | null
  }

  export type MissionPhotoMaxAggregateOutputType = {
    id: number | null
    missionId: number | null
    photo: Uint8Array | null
    uploadedAt: Date | null
  }

  export type MissionPhotoCountAggregateOutputType = {
    id: number
    missionId: number
    photo: number
    uploadedAt: number
    _all: number
  }


  export type MissionPhotoAvgAggregateInputType = {
    id?: true
    missionId?: true
  }

  export type MissionPhotoSumAggregateInputType = {
    id?: true
    missionId?: true
  }

  export type MissionPhotoMinAggregateInputType = {
    id?: true
    missionId?: true
    photo?: true
    uploadedAt?: true
  }

  export type MissionPhotoMaxAggregateInputType = {
    id?: true
    missionId?: true
    photo?: true
    uploadedAt?: true
  }

  export type MissionPhotoCountAggregateInputType = {
    id?: true
    missionId?: true
    photo?: true
    uploadedAt?: true
    _all?: true
  }

  export type MissionPhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MissionPhoto to aggregate.
     */
    where?: MissionPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissionPhotos to fetch.
     */
    orderBy?: MissionPhotoOrderByWithRelationInput | MissionPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MissionPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissionPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissionPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MissionPhotos
    **/
    _count?: true | MissionPhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MissionPhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MissionPhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MissionPhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MissionPhotoMaxAggregateInputType
  }

  export type GetMissionPhotoAggregateType<T extends MissionPhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateMissionPhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMissionPhoto[P]>
      : GetScalarType<T[P], AggregateMissionPhoto[P]>
  }




  export type MissionPhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissionPhotoWhereInput
    orderBy?: MissionPhotoOrderByWithAggregationInput | MissionPhotoOrderByWithAggregationInput[]
    by: MissionPhotoScalarFieldEnum[] | MissionPhotoScalarFieldEnum
    having?: MissionPhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MissionPhotoCountAggregateInputType | true
    _avg?: MissionPhotoAvgAggregateInputType
    _sum?: MissionPhotoSumAggregateInputType
    _min?: MissionPhotoMinAggregateInputType
    _max?: MissionPhotoMaxAggregateInputType
  }

  export type MissionPhotoGroupByOutputType = {
    id: number
    missionId: number
    photo: Uint8Array
    uploadedAt: Date
    _count: MissionPhotoCountAggregateOutputType | null
    _avg: MissionPhotoAvgAggregateOutputType | null
    _sum: MissionPhotoSumAggregateOutputType | null
    _min: MissionPhotoMinAggregateOutputType | null
    _max: MissionPhotoMaxAggregateOutputType | null
  }

  type GetMissionPhotoGroupByPayload<T extends MissionPhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MissionPhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MissionPhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MissionPhotoGroupByOutputType[P]>
            : GetScalarType<T[P], MissionPhotoGroupByOutputType[P]>
        }
      >
    >


  export type MissionPhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    missionId?: boolean
    photo?: boolean
    uploadedAt?: boolean
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missionPhoto"]>

  export type MissionPhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    missionId?: boolean
    photo?: boolean
    uploadedAt?: boolean
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missionPhoto"]>

  export type MissionPhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    missionId?: boolean
    photo?: boolean
    uploadedAt?: boolean
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missionPhoto"]>

  export type MissionPhotoSelectScalar = {
    id?: boolean
    missionId?: boolean
    photo?: boolean
    uploadedAt?: boolean
  }

  export type MissionPhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "missionId" | "photo" | "uploadedAt", ExtArgs["result"]["missionPhoto"]>
  export type MissionPhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }
  export type MissionPhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }
  export type MissionPhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mission?: boolean | MissionDefaultArgs<ExtArgs>
  }

  export type $MissionPhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MissionPhoto"
    objects: {
      mission: Prisma.$MissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      missionId: number
      photo: Uint8Array
      uploadedAt: Date
    }, ExtArgs["result"]["missionPhoto"]>
    composites: {}
  }

  type MissionPhotoGetPayload<S extends boolean | null | undefined | MissionPhotoDefaultArgs> = $Result.GetResult<Prisma.$MissionPhotoPayload, S>

  type MissionPhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MissionPhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MissionPhotoCountAggregateInputType | true
    }

  export interface MissionPhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MissionPhoto'], meta: { name: 'MissionPhoto' } }
    /**
     * Find zero or one MissionPhoto that matches the filter.
     * @param {MissionPhotoFindUniqueArgs} args - Arguments to find a MissionPhoto
     * @example
     * // Get one MissionPhoto
     * const missionPhoto = await prisma.missionPhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MissionPhotoFindUniqueArgs>(args: SelectSubset<T, MissionPhotoFindUniqueArgs<ExtArgs>>): Prisma__MissionPhotoClient<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MissionPhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MissionPhotoFindUniqueOrThrowArgs} args - Arguments to find a MissionPhoto
     * @example
     * // Get one MissionPhoto
     * const missionPhoto = await prisma.missionPhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MissionPhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, MissionPhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MissionPhotoClient<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MissionPhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionPhotoFindFirstArgs} args - Arguments to find a MissionPhoto
     * @example
     * // Get one MissionPhoto
     * const missionPhoto = await prisma.missionPhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MissionPhotoFindFirstArgs>(args?: SelectSubset<T, MissionPhotoFindFirstArgs<ExtArgs>>): Prisma__MissionPhotoClient<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MissionPhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionPhotoFindFirstOrThrowArgs} args - Arguments to find a MissionPhoto
     * @example
     * // Get one MissionPhoto
     * const missionPhoto = await prisma.missionPhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MissionPhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, MissionPhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__MissionPhotoClient<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MissionPhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionPhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MissionPhotos
     * const missionPhotos = await prisma.missionPhoto.findMany()
     * 
     * // Get first 10 MissionPhotos
     * const missionPhotos = await prisma.missionPhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const missionPhotoWithIdOnly = await prisma.missionPhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MissionPhotoFindManyArgs>(args?: SelectSubset<T, MissionPhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MissionPhoto.
     * @param {MissionPhotoCreateArgs} args - Arguments to create a MissionPhoto.
     * @example
     * // Create one MissionPhoto
     * const MissionPhoto = await prisma.missionPhoto.create({
     *   data: {
     *     // ... data to create a MissionPhoto
     *   }
     * })
     * 
     */
    create<T extends MissionPhotoCreateArgs>(args: SelectSubset<T, MissionPhotoCreateArgs<ExtArgs>>): Prisma__MissionPhotoClient<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MissionPhotos.
     * @param {MissionPhotoCreateManyArgs} args - Arguments to create many MissionPhotos.
     * @example
     * // Create many MissionPhotos
     * const missionPhoto = await prisma.missionPhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MissionPhotoCreateManyArgs>(args?: SelectSubset<T, MissionPhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MissionPhotos and returns the data saved in the database.
     * @param {MissionPhotoCreateManyAndReturnArgs} args - Arguments to create many MissionPhotos.
     * @example
     * // Create many MissionPhotos
     * const missionPhoto = await prisma.missionPhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MissionPhotos and only return the `id`
     * const missionPhotoWithIdOnly = await prisma.missionPhoto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MissionPhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, MissionPhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MissionPhoto.
     * @param {MissionPhotoDeleteArgs} args - Arguments to delete one MissionPhoto.
     * @example
     * // Delete one MissionPhoto
     * const MissionPhoto = await prisma.missionPhoto.delete({
     *   where: {
     *     // ... filter to delete one MissionPhoto
     *   }
     * })
     * 
     */
    delete<T extends MissionPhotoDeleteArgs>(args: SelectSubset<T, MissionPhotoDeleteArgs<ExtArgs>>): Prisma__MissionPhotoClient<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MissionPhoto.
     * @param {MissionPhotoUpdateArgs} args - Arguments to update one MissionPhoto.
     * @example
     * // Update one MissionPhoto
     * const missionPhoto = await prisma.missionPhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MissionPhotoUpdateArgs>(args: SelectSubset<T, MissionPhotoUpdateArgs<ExtArgs>>): Prisma__MissionPhotoClient<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MissionPhotos.
     * @param {MissionPhotoDeleteManyArgs} args - Arguments to filter MissionPhotos to delete.
     * @example
     * // Delete a few MissionPhotos
     * const { count } = await prisma.missionPhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MissionPhotoDeleteManyArgs>(args?: SelectSubset<T, MissionPhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MissionPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionPhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MissionPhotos
     * const missionPhoto = await prisma.missionPhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MissionPhotoUpdateManyArgs>(args: SelectSubset<T, MissionPhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MissionPhotos and returns the data updated in the database.
     * @param {MissionPhotoUpdateManyAndReturnArgs} args - Arguments to update many MissionPhotos.
     * @example
     * // Update many MissionPhotos
     * const missionPhoto = await prisma.missionPhoto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MissionPhotos and only return the `id`
     * const missionPhotoWithIdOnly = await prisma.missionPhoto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MissionPhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, MissionPhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MissionPhoto.
     * @param {MissionPhotoUpsertArgs} args - Arguments to update or create a MissionPhoto.
     * @example
     * // Update or create a MissionPhoto
     * const missionPhoto = await prisma.missionPhoto.upsert({
     *   create: {
     *     // ... data to create a MissionPhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MissionPhoto we want to update
     *   }
     * })
     */
    upsert<T extends MissionPhotoUpsertArgs>(args: SelectSubset<T, MissionPhotoUpsertArgs<ExtArgs>>): Prisma__MissionPhotoClient<$Result.GetResult<Prisma.$MissionPhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MissionPhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionPhotoCountArgs} args - Arguments to filter MissionPhotos to count.
     * @example
     * // Count the number of MissionPhotos
     * const count = await prisma.missionPhoto.count({
     *   where: {
     *     // ... the filter for the MissionPhotos we want to count
     *   }
     * })
    **/
    count<T extends MissionPhotoCountArgs>(
      args?: Subset<T, MissionPhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MissionPhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MissionPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionPhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MissionPhotoAggregateArgs>(args: Subset<T, MissionPhotoAggregateArgs>): Prisma.PrismaPromise<GetMissionPhotoAggregateType<T>>

    /**
     * Group by MissionPhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissionPhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MissionPhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MissionPhotoGroupByArgs['orderBy'] }
        : { orderBy?: MissionPhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MissionPhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMissionPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MissionPhoto model
   */
  readonly fields: MissionPhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MissionPhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MissionPhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mission<T extends MissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MissionDefaultArgs<ExtArgs>>): Prisma__MissionClient<$Result.GetResult<Prisma.$MissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MissionPhoto model
   */
  interface MissionPhotoFieldRefs {
    readonly id: FieldRef<"MissionPhoto", 'Int'>
    readonly missionId: FieldRef<"MissionPhoto", 'Int'>
    readonly photo: FieldRef<"MissionPhoto", 'Bytes'>
    readonly uploadedAt: FieldRef<"MissionPhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MissionPhoto findUnique
   */
  export type MissionPhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * Filter, which MissionPhoto to fetch.
     */
    where: MissionPhotoWhereUniqueInput
  }

  /**
   * MissionPhoto findUniqueOrThrow
   */
  export type MissionPhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * Filter, which MissionPhoto to fetch.
     */
    where: MissionPhotoWhereUniqueInput
  }

  /**
   * MissionPhoto findFirst
   */
  export type MissionPhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * Filter, which MissionPhoto to fetch.
     */
    where?: MissionPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissionPhotos to fetch.
     */
    orderBy?: MissionPhotoOrderByWithRelationInput | MissionPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MissionPhotos.
     */
    cursor?: MissionPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissionPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissionPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MissionPhotos.
     */
    distinct?: MissionPhotoScalarFieldEnum | MissionPhotoScalarFieldEnum[]
  }

  /**
   * MissionPhoto findFirstOrThrow
   */
  export type MissionPhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * Filter, which MissionPhoto to fetch.
     */
    where?: MissionPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissionPhotos to fetch.
     */
    orderBy?: MissionPhotoOrderByWithRelationInput | MissionPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MissionPhotos.
     */
    cursor?: MissionPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissionPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissionPhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MissionPhotos.
     */
    distinct?: MissionPhotoScalarFieldEnum | MissionPhotoScalarFieldEnum[]
  }

  /**
   * MissionPhoto findMany
   */
  export type MissionPhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * Filter, which MissionPhotos to fetch.
     */
    where?: MissionPhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissionPhotos to fetch.
     */
    orderBy?: MissionPhotoOrderByWithRelationInput | MissionPhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MissionPhotos.
     */
    cursor?: MissionPhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissionPhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissionPhotos.
     */
    skip?: number
    distinct?: MissionPhotoScalarFieldEnum | MissionPhotoScalarFieldEnum[]
  }

  /**
   * MissionPhoto create
   */
  export type MissionPhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a MissionPhoto.
     */
    data: XOR<MissionPhotoCreateInput, MissionPhotoUncheckedCreateInput>
  }

  /**
   * MissionPhoto createMany
   */
  export type MissionPhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MissionPhotos.
     */
    data: MissionPhotoCreateManyInput | MissionPhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MissionPhoto createManyAndReturn
   */
  export type MissionPhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * The data used to create many MissionPhotos.
     */
    data: MissionPhotoCreateManyInput | MissionPhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MissionPhoto update
   */
  export type MissionPhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a MissionPhoto.
     */
    data: XOR<MissionPhotoUpdateInput, MissionPhotoUncheckedUpdateInput>
    /**
     * Choose, which MissionPhoto to update.
     */
    where: MissionPhotoWhereUniqueInput
  }

  /**
   * MissionPhoto updateMany
   */
  export type MissionPhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MissionPhotos.
     */
    data: XOR<MissionPhotoUpdateManyMutationInput, MissionPhotoUncheckedUpdateManyInput>
    /**
     * Filter which MissionPhotos to update
     */
    where?: MissionPhotoWhereInput
    /**
     * Limit how many MissionPhotos to update.
     */
    limit?: number
  }

  /**
   * MissionPhoto updateManyAndReturn
   */
  export type MissionPhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * The data used to update MissionPhotos.
     */
    data: XOR<MissionPhotoUpdateManyMutationInput, MissionPhotoUncheckedUpdateManyInput>
    /**
     * Filter which MissionPhotos to update
     */
    where?: MissionPhotoWhereInput
    /**
     * Limit how many MissionPhotos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MissionPhoto upsert
   */
  export type MissionPhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the MissionPhoto to update in case it exists.
     */
    where: MissionPhotoWhereUniqueInput
    /**
     * In case the MissionPhoto found by the `where` argument doesn't exist, create a new MissionPhoto with this data.
     */
    create: XOR<MissionPhotoCreateInput, MissionPhotoUncheckedCreateInput>
    /**
     * In case the MissionPhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MissionPhotoUpdateInput, MissionPhotoUncheckedUpdateInput>
  }

  /**
   * MissionPhoto delete
   */
  export type MissionPhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
    /**
     * Filter which MissionPhoto to delete.
     */
    where: MissionPhotoWhereUniqueInput
  }

  /**
   * MissionPhoto deleteMany
   */
  export type MissionPhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MissionPhotos to delete
     */
    where?: MissionPhotoWhereInput
    /**
     * Limit how many MissionPhotos to delete.
     */
    limit?: number
  }

  /**
   * MissionPhoto without action
   */
  export type MissionPhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissionPhoto
     */
    select?: MissionPhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissionPhoto
     */
    omit?: MissionPhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissionPhotoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FestivalScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type FestivalScalarFieldEnum = (typeof FestivalScalarFieldEnum)[keyof typeof FestivalScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    festivalId: 'festivalId',
    mintAddress: 'mintAddress',
    symbol: 'symbol',
    name: 'name',
    decimals: 'decimals',
    supply: 'supply'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const MissionScalarFieldEnum: {
    id: 'id',
    festivalId: 'festivalId',
    title: 'title',
    description: 'description',
    rewardAmount: 'rewardAmount',
    createdAt: 'createdAt'
  };

  export type MissionScalarFieldEnum = (typeof MissionScalarFieldEnum)[keyof typeof MissionScalarFieldEnum]


  export const FestivalPhotoScalarFieldEnum: {
    id: 'id',
    festivalId: 'festivalId',
    photo: 'photo',
    uploadedAt: 'uploadedAt'
  };

  export type FestivalPhotoScalarFieldEnum = (typeof FestivalPhotoScalarFieldEnum)[keyof typeof FestivalPhotoScalarFieldEnum]


  export const MissionPhotoScalarFieldEnum: {
    id: 'id',
    missionId: 'missionId',
    photo: 'photo',
    uploadedAt: 'uploadedAt'
  };

  export type MissionPhotoScalarFieldEnum = (typeof MissionPhotoScalarFieldEnum)[keyof typeof MissionPhotoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type FestivalWhereInput = {
    AND?: FestivalWhereInput | FestivalWhereInput[]
    OR?: FestivalWhereInput[]
    NOT?: FestivalWhereInput | FestivalWhereInput[]
    id?: IntFilter<"Festival"> | number
    name?: StringFilter<"Festival"> | string
    description?: StringNullableFilter<"Festival"> | string | null
    createdAt?: DateTimeFilter<"Festival"> | Date | string
    token?: XOR<TokenNullableScalarRelationFilter, TokenWhereInput> | null
    missions?: MissionListRelationFilter
    photos?: FestivalPhotoListRelationFilter
  }

  export type FestivalOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    token?: TokenOrderByWithRelationInput
    missions?: MissionOrderByRelationAggregateInput
    photos?: FestivalPhotoOrderByRelationAggregateInput
  }

  export type FestivalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FestivalWhereInput | FestivalWhereInput[]
    OR?: FestivalWhereInput[]
    NOT?: FestivalWhereInput | FestivalWhereInput[]
    name?: StringFilter<"Festival"> | string
    description?: StringNullableFilter<"Festival"> | string | null
    createdAt?: DateTimeFilter<"Festival"> | Date | string
    token?: XOR<TokenNullableScalarRelationFilter, TokenWhereInput> | null
    missions?: MissionListRelationFilter
    photos?: FestivalPhotoListRelationFilter
  }, "id">

  export type FestivalOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FestivalCountOrderByAggregateInput
    _avg?: FestivalAvgOrderByAggregateInput
    _max?: FestivalMaxOrderByAggregateInput
    _min?: FestivalMinOrderByAggregateInput
    _sum?: FestivalSumOrderByAggregateInput
  }

  export type FestivalScalarWhereWithAggregatesInput = {
    AND?: FestivalScalarWhereWithAggregatesInput | FestivalScalarWhereWithAggregatesInput[]
    OR?: FestivalScalarWhereWithAggregatesInput[]
    NOT?: FestivalScalarWhereWithAggregatesInput | FestivalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Festival"> | number
    name?: StringWithAggregatesFilter<"Festival"> | string
    description?: StringNullableWithAggregatesFilter<"Festival"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Festival"> | Date | string
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: IntFilter<"Token"> | number
    festivalId?: IntFilter<"Token"> | number
    mintAddress?: StringFilter<"Token"> | string
    symbol?: StringFilter<"Token"> | string
    name?: StringFilter<"Token"> | string
    decimals?: IntFilter<"Token"> | number
    supply?: BigIntFilter<"Token"> | bigint | number
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    festivalId?: SortOrder
    mintAddress?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    supply?: SortOrder
    festival?: FestivalOrderByWithRelationInput
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    festivalId?: number
    mintAddress?: string
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    symbol?: StringFilter<"Token"> | string
    name?: StringFilter<"Token"> | string
    decimals?: IntFilter<"Token"> | number
    supply?: BigIntFilter<"Token"> | bigint | number
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
  }, "id" | "festivalId" | "mintAddress">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    festivalId?: SortOrder
    mintAddress?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    supply?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _avg?: TokenAvgOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    _sum?: TokenSumOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Token"> | number
    festivalId?: IntWithAggregatesFilter<"Token"> | number
    mintAddress?: StringWithAggregatesFilter<"Token"> | string
    symbol?: StringWithAggregatesFilter<"Token"> | string
    name?: StringWithAggregatesFilter<"Token"> | string
    decimals?: IntWithAggregatesFilter<"Token"> | number
    supply?: BigIntWithAggregatesFilter<"Token"> | bigint | number
  }

  export type MissionWhereInput = {
    AND?: MissionWhereInput | MissionWhereInput[]
    OR?: MissionWhereInput[]
    NOT?: MissionWhereInput | MissionWhereInput[]
    id?: IntFilter<"Mission"> | number
    festivalId?: IntFilter<"Mission"> | number
    title?: StringFilter<"Mission"> | string
    description?: StringNullableFilter<"Mission"> | string | null
    rewardAmount?: BigIntFilter<"Mission"> | bigint | number
    createdAt?: DateTimeFilter<"Mission"> | Date | string
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
    photos?: MissionPhotoListRelationFilter
  }

  export type MissionOrderByWithRelationInput = {
    id?: SortOrder
    festivalId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    rewardAmount?: SortOrder
    createdAt?: SortOrder
    festival?: FestivalOrderByWithRelationInput
    photos?: MissionPhotoOrderByRelationAggregateInput
  }

  export type MissionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MissionWhereInput | MissionWhereInput[]
    OR?: MissionWhereInput[]
    NOT?: MissionWhereInput | MissionWhereInput[]
    festivalId?: IntFilter<"Mission"> | number
    title?: StringFilter<"Mission"> | string
    description?: StringNullableFilter<"Mission"> | string | null
    rewardAmount?: BigIntFilter<"Mission"> | bigint | number
    createdAt?: DateTimeFilter<"Mission"> | Date | string
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
    photos?: MissionPhotoListRelationFilter
  }, "id">

  export type MissionOrderByWithAggregationInput = {
    id?: SortOrder
    festivalId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    rewardAmount?: SortOrder
    createdAt?: SortOrder
    _count?: MissionCountOrderByAggregateInput
    _avg?: MissionAvgOrderByAggregateInput
    _max?: MissionMaxOrderByAggregateInput
    _min?: MissionMinOrderByAggregateInput
    _sum?: MissionSumOrderByAggregateInput
  }

  export type MissionScalarWhereWithAggregatesInput = {
    AND?: MissionScalarWhereWithAggregatesInput | MissionScalarWhereWithAggregatesInput[]
    OR?: MissionScalarWhereWithAggregatesInput[]
    NOT?: MissionScalarWhereWithAggregatesInput | MissionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mission"> | number
    festivalId?: IntWithAggregatesFilter<"Mission"> | number
    title?: StringWithAggregatesFilter<"Mission"> | string
    description?: StringNullableWithAggregatesFilter<"Mission"> | string | null
    rewardAmount?: BigIntWithAggregatesFilter<"Mission"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"Mission"> | Date | string
  }

  export type FestivalPhotoWhereInput = {
    AND?: FestivalPhotoWhereInput | FestivalPhotoWhereInput[]
    OR?: FestivalPhotoWhereInput[]
    NOT?: FestivalPhotoWhereInput | FestivalPhotoWhereInput[]
    id?: IntFilter<"FestivalPhoto"> | number
    festivalId?: IntFilter<"FestivalPhoto"> | number
    photo?: BytesFilter<"FestivalPhoto"> | Uint8Array
    uploadedAt?: DateTimeFilter<"FestivalPhoto"> | Date | string
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
  }

  export type FestivalPhotoOrderByWithRelationInput = {
    id?: SortOrder
    festivalId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
    festival?: FestivalOrderByWithRelationInput
  }

  export type FestivalPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FestivalPhotoWhereInput | FestivalPhotoWhereInput[]
    OR?: FestivalPhotoWhereInput[]
    NOT?: FestivalPhotoWhereInput | FestivalPhotoWhereInput[]
    festivalId?: IntFilter<"FestivalPhoto"> | number
    photo?: BytesFilter<"FestivalPhoto"> | Uint8Array
    uploadedAt?: DateTimeFilter<"FestivalPhoto"> | Date | string
    festival?: XOR<FestivalScalarRelationFilter, FestivalWhereInput>
  }, "id">

  export type FestivalPhotoOrderByWithAggregationInput = {
    id?: SortOrder
    festivalId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
    _count?: FestivalPhotoCountOrderByAggregateInput
    _avg?: FestivalPhotoAvgOrderByAggregateInput
    _max?: FestivalPhotoMaxOrderByAggregateInput
    _min?: FestivalPhotoMinOrderByAggregateInput
    _sum?: FestivalPhotoSumOrderByAggregateInput
  }

  export type FestivalPhotoScalarWhereWithAggregatesInput = {
    AND?: FestivalPhotoScalarWhereWithAggregatesInput | FestivalPhotoScalarWhereWithAggregatesInput[]
    OR?: FestivalPhotoScalarWhereWithAggregatesInput[]
    NOT?: FestivalPhotoScalarWhereWithAggregatesInput | FestivalPhotoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FestivalPhoto"> | number
    festivalId?: IntWithAggregatesFilter<"FestivalPhoto"> | number
    photo?: BytesWithAggregatesFilter<"FestivalPhoto"> | Uint8Array
    uploadedAt?: DateTimeWithAggregatesFilter<"FestivalPhoto"> | Date | string
  }

  export type MissionPhotoWhereInput = {
    AND?: MissionPhotoWhereInput | MissionPhotoWhereInput[]
    OR?: MissionPhotoWhereInput[]
    NOT?: MissionPhotoWhereInput | MissionPhotoWhereInput[]
    id?: IntFilter<"MissionPhoto"> | number
    missionId?: IntFilter<"MissionPhoto"> | number
    photo?: BytesFilter<"MissionPhoto"> | Uint8Array
    uploadedAt?: DateTimeFilter<"MissionPhoto"> | Date | string
    mission?: XOR<MissionScalarRelationFilter, MissionWhereInput>
  }

  export type MissionPhotoOrderByWithRelationInput = {
    id?: SortOrder
    missionId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
    mission?: MissionOrderByWithRelationInput
  }

  export type MissionPhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MissionPhotoWhereInput | MissionPhotoWhereInput[]
    OR?: MissionPhotoWhereInput[]
    NOT?: MissionPhotoWhereInput | MissionPhotoWhereInput[]
    missionId?: IntFilter<"MissionPhoto"> | number
    photo?: BytesFilter<"MissionPhoto"> | Uint8Array
    uploadedAt?: DateTimeFilter<"MissionPhoto"> | Date | string
    mission?: XOR<MissionScalarRelationFilter, MissionWhereInput>
  }, "id">

  export type MissionPhotoOrderByWithAggregationInput = {
    id?: SortOrder
    missionId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
    _count?: MissionPhotoCountOrderByAggregateInput
    _avg?: MissionPhotoAvgOrderByAggregateInput
    _max?: MissionPhotoMaxOrderByAggregateInput
    _min?: MissionPhotoMinOrderByAggregateInput
    _sum?: MissionPhotoSumOrderByAggregateInput
  }

  export type MissionPhotoScalarWhereWithAggregatesInput = {
    AND?: MissionPhotoScalarWhereWithAggregatesInput | MissionPhotoScalarWhereWithAggregatesInput[]
    OR?: MissionPhotoScalarWhereWithAggregatesInput[]
    NOT?: MissionPhotoScalarWhereWithAggregatesInput | MissionPhotoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MissionPhoto"> | number
    missionId?: IntWithAggregatesFilter<"MissionPhoto"> | number
    photo?: BytesWithAggregatesFilter<"MissionPhoto"> | Uint8Array
    uploadedAt?: DateTimeWithAggregatesFilter<"MissionPhoto"> | Date | string
  }

  export type FestivalCreateInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    token?: TokenCreateNestedOneWithoutFestivalInput
    missions?: MissionCreateNestedManyWithoutFestivalInput
    photos?: FestivalPhotoCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    token?: TokenUncheckedCreateNestedOneWithoutFestivalInput
    missions?: MissionUncheckedCreateNestedManyWithoutFestivalInput
    photos?: FestivalPhotoUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneWithoutFestivalNestedInput
    missions?: MissionUpdateManyWithoutFestivalNestedInput
    photos?: FestivalPhotoUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUncheckedUpdateOneWithoutFestivalNestedInput
    missions?: MissionUncheckedUpdateManyWithoutFestivalNestedInput
    photos?: FestivalPhotoUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
  }

  export type FestivalUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateInput = {
    mintAddress: string
    symbol: string
    name: string
    decimals?: number
    supply?: bigint | number
    festival: FestivalCreateNestedOneWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: number
    festivalId: number
    mintAddress: string
    symbol: string
    name: string
    decimals?: number
    supply?: bigint | number
  }

  export type TokenUpdateInput = {
    mintAddress?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    supply?: BigIntFieldUpdateOperationsInput | bigint | number
    festival?: FestivalUpdateOneRequiredWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    festivalId?: IntFieldUpdateOperationsInput | number
    mintAddress?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    supply?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type TokenCreateManyInput = {
    id?: number
    festivalId: number
    mintAddress: string
    symbol: string
    name: string
    decimals?: number
    supply?: bigint | number
  }

  export type TokenUpdateManyMutationInput = {
    mintAddress?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    supply?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    festivalId?: IntFieldUpdateOperationsInput | number
    mintAddress?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    supply?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type MissionCreateInput = {
    title: string
    description?: string | null
    rewardAmount: bigint | number
    createdAt?: Date | string
    festival: FestivalCreateNestedOneWithoutMissionsInput
    photos?: MissionPhotoCreateNestedManyWithoutMissionInput
  }

  export type MissionUncheckedCreateInput = {
    id?: number
    festivalId: number
    title: string
    description?: string | null
    rewardAmount: bigint | number
    createdAt?: Date | string
    photos?: MissionPhotoUncheckedCreateNestedManyWithoutMissionInput
  }

  export type MissionUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festival?: FestivalUpdateOneRequiredWithoutMissionsNestedInput
    photos?: MissionPhotoUpdateManyWithoutMissionNestedInput
  }

  export type MissionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    festivalId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: MissionPhotoUncheckedUpdateManyWithoutMissionNestedInput
  }

  export type MissionCreateManyInput = {
    id?: number
    festivalId: number
    title: string
    description?: string | null
    rewardAmount: bigint | number
    createdAt?: Date | string
  }

  export type MissionUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    festivalId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalPhotoCreateInput = {
    photo: Uint8Array
    uploadedAt?: Date | string
    festival: FestivalCreateNestedOneWithoutPhotosInput
  }

  export type FestivalPhotoUncheckedCreateInput = {
    id?: number
    festivalId: number
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type FestivalPhotoUpdateInput = {
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festival?: FestivalUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type FestivalPhotoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    festivalId?: IntFieldUpdateOperationsInput | number
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalPhotoCreateManyInput = {
    id?: number
    festivalId: number
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type FestivalPhotoUpdateManyMutationInput = {
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalPhotoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    festivalId?: IntFieldUpdateOperationsInput | number
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionPhotoCreateInput = {
    photo: Uint8Array
    uploadedAt?: Date | string
    mission: MissionCreateNestedOneWithoutPhotosInput
  }

  export type MissionPhotoUncheckedCreateInput = {
    id?: number
    missionId: number
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type MissionPhotoUpdateInput = {
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mission?: MissionUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type MissionPhotoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    missionId?: IntFieldUpdateOperationsInput | number
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionPhotoCreateManyInput = {
    id?: number
    missionId: number
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type MissionPhotoUpdateManyMutationInput = {
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionPhotoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    missionId?: IntFieldUpdateOperationsInput | number
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TokenNullableScalarRelationFilter = {
    is?: TokenWhereInput | null
    isNot?: TokenWhereInput | null
  }

  export type MissionListRelationFilter = {
    every?: MissionWhereInput
    some?: MissionWhereInput
    none?: MissionWhereInput
  }

  export type FestivalPhotoListRelationFilter = {
    every?: FestivalPhotoWhereInput
    some?: FestivalPhotoWhereInput
    none?: FestivalPhotoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FestivalPhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FestivalCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FestivalAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FestivalMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FestivalMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type FestivalSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type FestivalScalarRelationFilter = {
    is?: FestivalWhereInput
    isNot?: FestivalWhereInput
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    mintAddress?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    supply?: SortOrder
  }

  export type TokenAvgOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    decimals?: SortOrder
    supply?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    mintAddress?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    supply?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    mintAddress?: SortOrder
    symbol?: SortOrder
    name?: SortOrder
    decimals?: SortOrder
    supply?: SortOrder
  }

  export type TokenSumOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    decimals?: SortOrder
    supply?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type MissionPhotoListRelationFilter = {
    every?: MissionPhotoWhereInput
    some?: MissionPhotoWhereInput
    none?: MissionPhotoWhereInput
  }

  export type MissionPhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MissionCountOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rewardAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type MissionAvgOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    rewardAmount?: SortOrder
  }

  export type MissionMaxOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rewardAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type MissionMinOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rewardAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type MissionSumOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    rewardAmount?: SortOrder
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type FestivalPhotoCountOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
  }

  export type FestivalPhotoAvgOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
  }

  export type FestivalPhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
  }

  export type FestivalPhotoMinOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
  }

  export type FestivalPhotoSumOrderByAggregateInput = {
    id?: SortOrder
    festivalId?: SortOrder
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type MissionScalarRelationFilter = {
    is?: MissionWhereInput
    isNot?: MissionWhereInput
  }

  export type MissionPhotoCountOrderByAggregateInput = {
    id?: SortOrder
    missionId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MissionPhotoAvgOrderByAggregateInput = {
    id?: SortOrder
    missionId?: SortOrder
  }

  export type MissionPhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    missionId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MissionPhotoMinOrderByAggregateInput = {
    id?: SortOrder
    missionId?: SortOrder
    photo?: SortOrder
    uploadedAt?: SortOrder
  }

  export type MissionPhotoSumOrderByAggregateInput = {
    id?: SortOrder
    missionId?: SortOrder
  }

  export type TokenCreateNestedOneWithoutFestivalInput = {
    create?: XOR<TokenCreateWithoutFestivalInput, TokenUncheckedCreateWithoutFestivalInput>
    connectOrCreate?: TokenCreateOrConnectWithoutFestivalInput
    connect?: TokenWhereUniqueInput
  }

  export type MissionCreateNestedManyWithoutFestivalInput = {
    create?: XOR<MissionCreateWithoutFestivalInput, MissionUncheckedCreateWithoutFestivalInput> | MissionCreateWithoutFestivalInput[] | MissionUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: MissionCreateOrConnectWithoutFestivalInput | MissionCreateOrConnectWithoutFestivalInput[]
    createMany?: MissionCreateManyFestivalInputEnvelope
    connect?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
  }

  export type FestivalPhotoCreateNestedManyWithoutFestivalInput = {
    create?: XOR<FestivalPhotoCreateWithoutFestivalInput, FestivalPhotoUncheckedCreateWithoutFestivalInput> | FestivalPhotoCreateWithoutFestivalInput[] | FestivalPhotoUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: FestivalPhotoCreateOrConnectWithoutFestivalInput | FestivalPhotoCreateOrConnectWithoutFestivalInput[]
    createMany?: FestivalPhotoCreateManyFestivalInputEnvelope
    connect?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
  }

  export type TokenUncheckedCreateNestedOneWithoutFestivalInput = {
    create?: XOR<TokenCreateWithoutFestivalInput, TokenUncheckedCreateWithoutFestivalInput>
    connectOrCreate?: TokenCreateOrConnectWithoutFestivalInput
    connect?: TokenWhereUniqueInput
  }

  export type MissionUncheckedCreateNestedManyWithoutFestivalInput = {
    create?: XOR<MissionCreateWithoutFestivalInput, MissionUncheckedCreateWithoutFestivalInput> | MissionCreateWithoutFestivalInput[] | MissionUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: MissionCreateOrConnectWithoutFestivalInput | MissionCreateOrConnectWithoutFestivalInput[]
    createMany?: MissionCreateManyFestivalInputEnvelope
    connect?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
  }

  export type FestivalPhotoUncheckedCreateNestedManyWithoutFestivalInput = {
    create?: XOR<FestivalPhotoCreateWithoutFestivalInput, FestivalPhotoUncheckedCreateWithoutFestivalInput> | FestivalPhotoCreateWithoutFestivalInput[] | FestivalPhotoUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: FestivalPhotoCreateOrConnectWithoutFestivalInput | FestivalPhotoCreateOrConnectWithoutFestivalInput[]
    createMany?: FestivalPhotoCreateManyFestivalInputEnvelope
    connect?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TokenUpdateOneWithoutFestivalNestedInput = {
    create?: XOR<TokenCreateWithoutFestivalInput, TokenUncheckedCreateWithoutFestivalInput>
    connectOrCreate?: TokenCreateOrConnectWithoutFestivalInput
    upsert?: TokenUpsertWithoutFestivalInput
    disconnect?: TokenWhereInput | boolean
    delete?: TokenWhereInput | boolean
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutFestivalInput, TokenUpdateWithoutFestivalInput>, TokenUncheckedUpdateWithoutFestivalInput>
  }

  export type MissionUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<MissionCreateWithoutFestivalInput, MissionUncheckedCreateWithoutFestivalInput> | MissionCreateWithoutFestivalInput[] | MissionUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: MissionCreateOrConnectWithoutFestivalInput | MissionCreateOrConnectWithoutFestivalInput[]
    upsert?: MissionUpsertWithWhereUniqueWithoutFestivalInput | MissionUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: MissionCreateManyFestivalInputEnvelope
    set?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
    disconnect?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
    delete?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
    connect?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
    update?: MissionUpdateWithWhereUniqueWithoutFestivalInput | MissionUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: MissionUpdateManyWithWhereWithoutFestivalInput | MissionUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: MissionScalarWhereInput | MissionScalarWhereInput[]
  }

  export type FestivalPhotoUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<FestivalPhotoCreateWithoutFestivalInput, FestivalPhotoUncheckedCreateWithoutFestivalInput> | FestivalPhotoCreateWithoutFestivalInput[] | FestivalPhotoUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: FestivalPhotoCreateOrConnectWithoutFestivalInput | FestivalPhotoCreateOrConnectWithoutFestivalInput[]
    upsert?: FestivalPhotoUpsertWithWhereUniqueWithoutFestivalInput | FestivalPhotoUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: FestivalPhotoCreateManyFestivalInputEnvelope
    set?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
    disconnect?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
    delete?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
    connect?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
    update?: FestivalPhotoUpdateWithWhereUniqueWithoutFestivalInput | FestivalPhotoUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: FestivalPhotoUpdateManyWithWhereWithoutFestivalInput | FestivalPhotoUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: FestivalPhotoScalarWhereInput | FestivalPhotoScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TokenUncheckedUpdateOneWithoutFestivalNestedInput = {
    create?: XOR<TokenCreateWithoutFestivalInput, TokenUncheckedCreateWithoutFestivalInput>
    connectOrCreate?: TokenCreateOrConnectWithoutFestivalInput
    upsert?: TokenUpsertWithoutFestivalInput
    disconnect?: TokenWhereInput | boolean
    delete?: TokenWhereInput | boolean
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutFestivalInput, TokenUpdateWithoutFestivalInput>, TokenUncheckedUpdateWithoutFestivalInput>
  }

  export type MissionUncheckedUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<MissionCreateWithoutFestivalInput, MissionUncheckedCreateWithoutFestivalInput> | MissionCreateWithoutFestivalInput[] | MissionUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: MissionCreateOrConnectWithoutFestivalInput | MissionCreateOrConnectWithoutFestivalInput[]
    upsert?: MissionUpsertWithWhereUniqueWithoutFestivalInput | MissionUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: MissionCreateManyFestivalInputEnvelope
    set?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
    disconnect?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
    delete?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
    connect?: MissionWhereUniqueInput | MissionWhereUniqueInput[]
    update?: MissionUpdateWithWhereUniqueWithoutFestivalInput | MissionUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: MissionUpdateManyWithWhereWithoutFestivalInput | MissionUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: MissionScalarWhereInput | MissionScalarWhereInput[]
  }

  export type FestivalPhotoUncheckedUpdateManyWithoutFestivalNestedInput = {
    create?: XOR<FestivalPhotoCreateWithoutFestivalInput, FestivalPhotoUncheckedCreateWithoutFestivalInput> | FestivalPhotoCreateWithoutFestivalInput[] | FestivalPhotoUncheckedCreateWithoutFestivalInput[]
    connectOrCreate?: FestivalPhotoCreateOrConnectWithoutFestivalInput | FestivalPhotoCreateOrConnectWithoutFestivalInput[]
    upsert?: FestivalPhotoUpsertWithWhereUniqueWithoutFestivalInput | FestivalPhotoUpsertWithWhereUniqueWithoutFestivalInput[]
    createMany?: FestivalPhotoCreateManyFestivalInputEnvelope
    set?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
    disconnect?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
    delete?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
    connect?: FestivalPhotoWhereUniqueInput | FestivalPhotoWhereUniqueInput[]
    update?: FestivalPhotoUpdateWithWhereUniqueWithoutFestivalInput | FestivalPhotoUpdateWithWhereUniqueWithoutFestivalInput[]
    updateMany?: FestivalPhotoUpdateManyWithWhereWithoutFestivalInput | FestivalPhotoUpdateManyWithWhereWithoutFestivalInput[]
    deleteMany?: FestivalPhotoScalarWhereInput | FestivalPhotoScalarWhereInput[]
  }

  export type FestivalCreateNestedOneWithoutTokenInput = {
    create?: XOR<FestivalCreateWithoutTokenInput, FestivalUncheckedCreateWithoutTokenInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutTokenInput
    connect?: FestivalWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type FestivalUpdateOneRequiredWithoutTokenNestedInput = {
    create?: XOR<FestivalCreateWithoutTokenInput, FestivalUncheckedCreateWithoutTokenInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutTokenInput
    upsert?: FestivalUpsertWithoutTokenInput
    connect?: FestivalWhereUniqueInput
    update?: XOR<XOR<FestivalUpdateToOneWithWhereWithoutTokenInput, FestivalUpdateWithoutTokenInput>, FestivalUncheckedUpdateWithoutTokenInput>
  }

  export type FestivalCreateNestedOneWithoutMissionsInput = {
    create?: XOR<FestivalCreateWithoutMissionsInput, FestivalUncheckedCreateWithoutMissionsInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutMissionsInput
    connect?: FestivalWhereUniqueInput
  }

  export type MissionPhotoCreateNestedManyWithoutMissionInput = {
    create?: XOR<MissionPhotoCreateWithoutMissionInput, MissionPhotoUncheckedCreateWithoutMissionInput> | MissionPhotoCreateWithoutMissionInput[] | MissionPhotoUncheckedCreateWithoutMissionInput[]
    connectOrCreate?: MissionPhotoCreateOrConnectWithoutMissionInput | MissionPhotoCreateOrConnectWithoutMissionInput[]
    createMany?: MissionPhotoCreateManyMissionInputEnvelope
    connect?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
  }

  export type MissionPhotoUncheckedCreateNestedManyWithoutMissionInput = {
    create?: XOR<MissionPhotoCreateWithoutMissionInput, MissionPhotoUncheckedCreateWithoutMissionInput> | MissionPhotoCreateWithoutMissionInput[] | MissionPhotoUncheckedCreateWithoutMissionInput[]
    connectOrCreate?: MissionPhotoCreateOrConnectWithoutMissionInput | MissionPhotoCreateOrConnectWithoutMissionInput[]
    createMany?: MissionPhotoCreateManyMissionInputEnvelope
    connect?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
  }

  export type FestivalUpdateOneRequiredWithoutMissionsNestedInput = {
    create?: XOR<FestivalCreateWithoutMissionsInput, FestivalUncheckedCreateWithoutMissionsInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutMissionsInput
    upsert?: FestivalUpsertWithoutMissionsInput
    connect?: FestivalWhereUniqueInput
    update?: XOR<XOR<FestivalUpdateToOneWithWhereWithoutMissionsInput, FestivalUpdateWithoutMissionsInput>, FestivalUncheckedUpdateWithoutMissionsInput>
  }

  export type MissionPhotoUpdateManyWithoutMissionNestedInput = {
    create?: XOR<MissionPhotoCreateWithoutMissionInput, MissionPhotoUncheckedCreateWithoutMissionInput> | MissionPhotoCreateWithoutMissionInput[] | MissionPhotoUncheckedCreateWithoutMissionInput[]
    connectOrCreate?: MissionPhotoCreateOrConnectWithoutMissionInput | MissionPhotoCreateOrConnectWithoutMissionInput[]
    upsert?: MissionPhotoUpsertWithWhereUniqueWithoutMissionInput | MissionPhotoUpsertWithWhereUniqueWithoutMissionInput[]
    createMany?: MissionPhotoCreateManyMissionInputEnvelope
    set?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
    disconnect?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
    delete?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
    connect?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
    update?: MissionPhotoUpdateWithWhereUniqueWithoutMissionInput | MissionPhotoUpdateWithWhereUniqueWithoutMissionInput[]
    updateMany?: MissionPhotoUpdateManyWithWhereWithoutMissionInput | MissionPhotoUpdateManyWithWhereWithoutMissionInput[]
    deleteMany?: MissionPhotoScalarWhereInput | MissionPhotoScalarWhereInput[]
  }

  export type MissionPhotoUncheckedUpdateManyWithoutMissionNestedInput = {
    create?: XOR<MissionPhotoCreateWithoutMissionInput, MissionPhotoUncheckedCreateWithoutMissionInput> | MissionPhotoCreateWithoutMissionInput[] | MissionPhotoUncheckedCreateWithoutMissionInput[]
    connectOrCreate?: MissionPhotoCreateOrConnectWithoutMissionInput | MissionPhotoCreateOrConnectWithoutMissionInput[]
    upsert?: MissionPhotoUpsertWithWhereUniqueWithoutMissionInput | MissionPhotoUpsertWithWhereUniqueWithoutMissionInput[]
    createMany?: MissionPhotoCreateManyMissionInputEnvelope
    set?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
    disconnect?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
    delete?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
    connect?: MissionPhotoWhereUniqueInput | MissionPhotoWhereUniqueInput[]
    update?: MissionPhotoUpdateWithWhereUniqueWithoutMissionInput | MissionPhotoUpdateWithWhereUniqueWithoutMissionInput[]
    updateMany?: MissionPhotoUpdateManyWithWhereWithoutMissionInput | MissionPhotoUpdateManyWithWhereWithoutMissionInput[]
    deleteMany?: MissionPhotoScalarWhereInput | MissionPhotoScalarWhereInput[]
  }

  export type FestivalCreateNestedOneWithoutPhotosInput = {
    create?: XOR<FestivalCreateWithoutPhotosInput, FestivalUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutPhotosInput
    connect?: FestivalWhereUniqueInput
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Uint8Array
  }

  export type FestivalUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<FestivalCreateWithoutPhotosInput, FestivalUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: FestivalCreateOrConnectWithoutPhotosInput
    upsert?: FestivalUpsertWithoutPhotosInput
    connect?: FestivalWhereUniqueInput
    update?: XOR<XOR<FestivalUpdateToOneWithWhereWithoutPhotosInput, FestivalUpdateWithoutPhotosInput>, FestivalUncheckedUpdateWithoutPhotosInput>
  }

  export type MissionCreateNestedOneWithoutPhotosInput = {
    create?: XOR<MissionCreateWithoutPhotosInput, MissionUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: MissionCreateOrConnectWithoutPhotosInput
    connect?: MissionWhereUniqueInput
  }

  export type MissionUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<MissionCreateWithoutPhotosInput, MissionUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: MissionCreateOrConnectWithoutPhotosInput
    upsert?: MissionUpsertWithoutPhotosInput
    connect?: MissionWhereUniqueInput
    update?: XOR<XOR<MissionUpdateToOneWithWhereWithoutPhotosInput, MissionUpdateWithoutPhotosInput>, MissionUncheckedUpdateWithoutPhotosInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type TokenCreateWithoutFestivalInput = {
    mintAddress: string
    symbol: string
    name: string
    decimals?: number
    supply?: bigint | number
  }

  export type TokenUncheckedCreateWithoutFestivalInput = {
    id?: number
    mintAddress: string
    symbol: string
    name: string
    decimals?: number
    supply?: bigint | number
  }

  export type TokenCreateOrConnectWithoutFestivalInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutFestivalInput, TokenUncheckedCreateWithoutFestivalInput>
  }

  export type MissionCreateWithoutFestivalInput = {
    title: string
    description?: string | null
    rewardAmount: bigint | number
    createdAt?: Date | string
    photos?: MissionPhotoCreateNestedManyWithoutMissionInput
  }

  export type MissionUncheckedCreateWithoutFestivalInput = {
    id?: number
    title: string
    description?: string | null
    rewardAmount: bigint | number
    createdAt?: Date | string
    photos?: MissionPhotoUncheckedCreateNestedManyWithoutMissionInput
  }

  export type MissionCreateOrConnectWithoutFestivalInput = {
    where: MissionWhereUniqueInput
    create: XOR<MissionCreateWithoutFestivalInput, MissionUncheckedCreateWithoutFestivalInput>
  }

  export type MissionCreateManyFestivalInputEnvelope = {
    data: MissionCreateManyFestivalInput | MissionCreateManyFestivalInput[]
    skipDuplicates?: boolean
  }

  export type FestivalPhotoCreateWithoutFestivalInput = {
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type FestivalPhotoUncheckedCreateWithoutFestivalInput = {
    id?: number
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type FestivalPhotoCreateOrConnectWithoutFestivalInput = {
    where: FestivalPhotoWhereUniqueInput
    create: XOR<FestivalPhotoCreateWithoutFestivalInput, FestivalPhotoUncheckedCreateWithoutFestivalInput>
  }

  export type FestivalPhotoCreateManyFestivalInputEnvelope = {
    data: FestivalPhotoCreateManyFestivalInput | FestivalPhotoCreateManyFestivalInput[]
    skipDuplicates?: boolean
  }

  export type TokenUpsertWithoutFestivalInput = {
    update: XOR<TokenUpdateWithoutFestivalInput, TokenUncheckedUpdateWithoutFestivalInput>
    create: XOR<TokenCreateWithoutFestivalInput, TokenUncheckedCreateWithoutFestivalInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutFestivalInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutFestivalInput, TokenUncheckedUpdateWithoutFestivalInput>
  }

  export type TokenUpdateWithoutFestivalInput = {
    mintAddress?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    supply?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type TokenUncheckedUpdateWithoutFestivalInput = {
    id?: IntFieldUpdateOperationsInput | number
    mintAddress?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    decimals?: IntFieldUpdateOperationsInput | number
    supply?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type MissionUpsertWithWhereUniqueWithoutFestivalInput = {
    where: MissionWhereUniqueInput
    update: XOR<MissionUpdateWithoutFestivalInput, MissionUncheckedUpdateWithoutFestivalInput>
    create: XOR<MissionCreateWithoutFestivalInput, MissionUncheckedCreateWithoutFestivalInput>
  }

  export type MissionUpdateWithWhereUniqueWithoutFestivalInput = {
    where: MissionWhereUniqueInput
    data: XOR<MissionUpdateWithoutFestivalInput, MissionUncheckedUpdateWithoutFestivalInput>
  }

  export type MissionUpdateManyWithWhereWithoutFestivalInput = {
    where: MissionScalarWhereInput
    data: XOR<MissionUpdateManyMutationInput, MissionUncheckedUpdateManyWithoutFestivalInput>
  }

  export type MissionScalarWhereInput = {
    AND?: MissionScalarWhereInput | MissionScalarWhereInput[]
    OR?: MissionScalarWhereInput[]
    NOT?: MissionScalarWhereInput | MissionScalarWhereInput[]
    id?: IntFilter<"Mission"> | number
    festivalId?: IntFilter<"Mission"> | number
    title?: StringFilter<"Mission"> | string
    description?: StringNullableFilter<"Mission"> | string | null
    rewardAmount?: BigIntFilter<"Mission"> | bigint | number
    createdAt?: DateTimeFilter<"Mission"> | Date | string
  }

  export type FestivalPhotoUpsertWithWhereUniqueWithoutFestivalInput = {
    where: FestivalPhotoWhereUniqueInput
    update: XOR<FestivalPhotoUpdateWithoutFestivalInput, FestivalPhotoUncheckedUpdateWithoutFestivalInput>
    create: XOR<FestivalPhotoCreateWithoutFestivalInput, FestivalPhotoUncheckedCreateWithoutFestivalInput>
  }

  export type FestivalPhotoUpdateWithWhereUniqueWithoutFestivalInput = {
    where: FestivalPhotoWhereUniqueInput
    data: XOR<FestivalPhotoUpdateWithoutFestivalInput, FestivalPhotoUncheckedUpdateWithoutFestivalInput>
  }

  export type FestivalPhotoUpdateManyWithWhereWithoutFestivalInput = {
    where: FestivalPhotoScalarWhereInput
    data: XOR<FestivalPhotoUpdateManyMutationInput, FestivalPhotoUncheckedUpdateManyWithoutFestivalInput>
  }

  export type FestivalPhotoScalarWhereInput = {
    AND?: FestivalPhotoScalarWhereInput | FestivalPhotoScalarWhereInput[]
    OR?: FestivalPhotoScalarWhereInput[]
    NOT?: FestivalPhotoScalarWhereInput | FestivalPhotoScalarWhereInput[]
    id?: IntFilter<"FestivalPhoto"> | number
    festivalId?: IntFilter<"FestivalPhoto"> | number
    photo?: BytesFilter<"FestivalPhoto"> | Uint8Array
    uploadedAt?: DateTimeFilter<"FestivalPhoto"> | Date | string
  }

  export type FestivalCreateWithoutTokenInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    missions?: MissionCreateNestedManyWithoutFestivalInput
    photos?: FestivalPhotoCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateWithoutTokenInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    missions?: MissionUncheckedCreateNestedManyWithoutFestivalInput
    photos?: FestivalPhotoUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalCreateOrConnectWithoutTokenInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutTokenInput, FestivalUncheckedCreateWithoutTokenInput>
  }

  export type FestivalUpsertWithoutTokenInput = {
    update: XOR<FestivalUpdateWithoutTokenInput, FestivalUncheckedUpdateWithoutTokenInput>
    create: XOR<FestivalCreateWithoutTokenInput, FestivalUncheckedCreateWithoutTokenInput>
    where?: FestivalWhereInput
  }

  export type FestivalUpdateToOneWithWhereWithoutTokenInput = {
    where?: FestivalWhereInput
    data: XOR<FestivalUpdateWithoutTokenInput, FestivalUncheckedUpdateWithoutTokenInput>
  }

  export type FestivalUpdateWithoutTokenInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    missions?: MissionUpdateManyWithoutFestivalNestedInput
    photos?: FestivalPhotoUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateWithoutTokenInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    missions?: MissionUncheckedUpdateManyWithoutFestivalNestedInput
    photos?: FestivalPhotoUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalCreateWithoutMissionsInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    token?: TokenCreateNestedOneWithoutFestivalInput
    photos?: FestivalPhotoCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateWithoutMissionsInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    token?: TokenUncheckedCreateNestedOneWithoutFestivalInput
    photos?: FestivalPhotoUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalCreateOrConnectWithoutMissionsInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutMissionsInput, FestivalUncheckedCreateWithoutMissionsInput>
  }

  export type MissionPhotoCreateWithoutMissionInput = {
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type MissionPhotoUncheckedCreateWithoutMissionInput = {
    id?: number
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type MissionPhotoCreateOrConnectWithoutMissionInput = {
    where: MissionPhotoWhereUniqueInput
    create: XOR<MissionPhotoCreateWithoutMissionInput, MissionPhotoUncheckedCreateWithoutMissionInput>
  }

  export type MissionPhotoCreateManyMissionInputEnvelope = {
    data: MissionPhotoCreateManyMissionInput | MissionPhotoCreateManyMissionInput[]
    skipDuplicates?: boolean
  }

  export type FestivalUpsertWithoutMissionsInput = {
    update: XOR<FestivalUpdateWithoutMissionsInput, FestivalUncheckedUpdateWithoutMissionsInput>
    create: XOR<FestivalCreateWithoutMissionsInput, FestivalUncheckedCreateWithoutMissionsInput>
    where?: FestivalWhereInput
  }

  export type FestivalUpdateToOneWithWhereWithoutMissionsInput = {
    where?: FestivalWhereInput
    data: XOR<FestivalUpdateWithoutMissionsInput, FestivalUncheckedUpdateWithoutMissionsInput>
  }

  export type FestivalUpdateWithoutMissionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneWithoutFestivalNestedInput
    photos?: FestivalPhotoUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateWithoutMissionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUncheckedUpdateOneWithoutFestivalNestedInput
    photos?: FestivalPhotoUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type MissionPhotoUpsertWithWhereUniqueWithoutMissionInput = {
    where: MissionPhotoWhereUniqueInput
    update: XOR<MissionPhotoUpdateWithoutMissionInput, MissionPhotoUncheckedUpdateWithoutMissionInput>
    create: XOR<MissionPhotoCreateWithoutMissionInput, MissionPhotoUncheckedCreateWithoutMissionInput>
  }

  export type MissionPhotoUpdateWithWhereUniqueWithoutMissionInput = {
    where: MissionPhotoWhereUniqueInput
    data: XOR<MissionPhotoUpdateWithoutMissionInput, MissionPhotoUncheckedUpdateWithoutMissionInput>
  }

  export type MissionPhotoUpdateManyWithWhereWithoutMissionInput = {
    where: MissionPhotoScalarWhereInput
    data: XOR<MissionPhotoUpdateManyMutationInput, MissionPhotoUncheckedUpdateManyWithoutMissionInput>
  }

  export type MissionPhotoScalarWhereInput = {
    AND?: MissionPhotoScalarWhereInput | MissionPhotoScalarWhereInput[]
    OR?: MissionPhotoScalarWhereInput[]
    NOT?: MissionPhotoScalarWhereInput | MissionPhotoScalarWhereInput[]
    id?: IntFilter<"MissionPhoto"> | number
    missionId?: IntFilter<"MissionPhoto"> | number
    photo?: BytesFilter<"MissionPhoto"> | Uint8Array
    uploadedAt?: DateTimeFilter<"MissionPhoto"> | Date | string
  }

  export type FestivalCreateWithoutPhotosInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    token?: TokenCreateNestedOneWithoutFestivalInput
    missions?: MissionCreateNestedManyWithoutFestivalInput
  }

  export type FestivalUncheckedCreateWithoutPhotosInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    token?: TokenUncheckedCreateNestedOneWithoutFestivalInput
    missions?: MissionUncheckedCreateNestedManyWithoutFestivalInput
  }

  export type FestivalCreateOrConnectWithoutPhotosInput = {
    where: FestivalWhereUniqueInput
    create: XOR<FestivalCreateWithoutPhotosInput, FestivalUncheckedCreateWithoutPhotosInput>
  }

  export type FestivalUpsertWithoutPhotosInput = {
    update: XOR<FestivalUpdateWithoutPhotosInput, FestivalUncheckedUpdateWithoutPhotosInput>
    create: XOR<FestivalCreateWithoutPhotosInput, FestivalUncheckedCreateWithoutPhotosInput>
    where?: FestivalWhereInput
  }

  export type FestivalUpdateToOneWithWhereWithoutPhotosInput = {
    where?: FestivalWhereInput
    data: XOR<FestivalUpdateWithoutPhotosInput, FestivalUncheckedUpdateWithoutPhotosInput>
  }

  export type FestivalUpdateWithoutPhotosInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUpdateOneWithoutFestivalNestedInput
    missions?: MissionUpdateManyWithoutFestivalNestedInput
  }

  export type FestivalUncheckedUpdateWithoutPhotosInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: TokenUncheckedUpdateOneWithoutFestivalNestedInput
    missions?: MissionUncheckedUpdateManyWithoutFestivalNestedInput
  }

  export type MissionCreateWithoutPhotosInput = {
    title: string
    description?: string | null
    rewardAmount: bigint | number
    createdAt?: Date | string
    festival: FestivalCreateNestedOneWithoutMissionsInput
  }

  export type MissionUncheckedCreateWithoutPhotosInput = {
    id?: number
    festivalId: number
    title: string
    description?: string | null
    rewardAmount: bigint | number
    createdAt?: Date | string
  }

  export type MissionCreateOrConnectWithoutPhotosInput = {
    where: MissionWhereUniqueInput
    create: XOR<MissionCreateWithoutPhotosInput, MissionUncheckedCreateWithoutPhotosInput>
  }

  export type MissionUpsertWithoutPhotosInput = {
    update: XOR<MissionUpdateWithoutPhotosInput, MissionUncheckedUpdateWithoutPhotosInput>
    create: XOR<MissionCreateWithoutPhotosInput, MissionUncheckedCreateWithoutPhotosInput>
    where?: MissionWhereInput
  }

  export type MissionUpdateToOneWithWhereWithoutPhotosInput = {
    where?: MissionWhereInput
    data: XOR<MissionUpdateWithoutPhotosInput, MissionUncheckedUpdateWithoutPhotosInput>
  }

  export type MissionUpdateWithoutPhotosInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    festival?: FestivalUpdateOneRequiredWithoutMissionsNestedInput
  }

  export type MissionUncheckedUpdateWithoutPhotosInput = {
    id?: IntFieldUpdateOperationsInput | number
    festivalId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionCreateManyFestivalInput = {
    id?: number
    title: string
    description?: string | null
    rewardAmount: bigint | number
    createdAt?: Date | string
  }

  export type FestivalPhotoCreateManyFestivalInput = {
    id?: number
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type MissionUpdateWithoutFestivalInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: MissionPhotoUpdateManyWithoutMissionNestedInput
  }

  export type MissionUncheckedUpdateWithoutFestivalInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: MissionPhotoUncheckedUpdateManyWithoutMissionNestedInput
  }

  export type MissionUncheckedUpdateManyWithoutFestivalInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rewardAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalPhotoUpdateWithoutFestivalInput = {
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalPhotoUncheckedUpdateWithoutFestivalInput = {
    id?: IntFieldUpdateOperationsInput | number
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FestivalPhotoUncheckedUpdateManyWithoutFestivalInput = {
    id?: IntFieldUpdateOperationsInput | number
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionPhotoCreateManyMissionInput = {
    id?: number
    photo: Uint8Array
    uploadedAt?: Date | string
  }

  export type MissionPhotoUpdateWithoutMissionInput = {
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionPhotoUncheckedUpdateWithoutMissionInput = {
    id?: IntFieldUpdateOperationsInput | number
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissionPhotoUncheckedUpdateManyWithoutMissionInput = {
    id?: IntFieldUpdateOperationsInput | number
    photo?: BytesFieldUpdateOperationsInput | Uint8Array
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}