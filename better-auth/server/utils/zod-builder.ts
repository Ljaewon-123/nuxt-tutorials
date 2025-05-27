// zod builder 
import { z, ZodTypeAny, ZodObject, ZodOptional, ZodArray } from 'zod';

export class ZodBuilder {
  private schemaShape: Record<string, ZodTypeAny> = {};

  // 필수 필드 추가
  addField<T extends ZodTypeAny>(key: string, schema: T): this {
    this.schemaShape[key] = schema;
    return this;
  }

  // 선택 필드 추가
  addOptionalField<T extends ZodTypeAny>(key: string, schema: T): this {
    this.schemaShape[key] = schema.optional();
    return this;
  }

  // 배열 필드 추가
  addArrayField<T extends ZodTypeAny>(key: string, schema: T): this {
    this.schemaShape[key] = z.array(schema);
    return this;
  }

  // 중첩 객체 추가
  addNestedObject(key: string, nestedBuilder: ZodBuilder): this {
    this.schemaShape[key] = nestedBuilder.build();
    return this;
  }

  // 기존 Zod 객체 병합
  mergeWithObject(obj: ZodObject<any>): this {
    this.schemaShape = {
      ...obj.shape,
      ...this.schemaShape,
    };
    return this;
  }

  // 스키마 완성
  build(): ZodObject<typeof this.schemaShape> {
    return z.object(this.schemaShape);
  }
}


// const userBuilder = new ZodBuilder()
//   .addField('id', z.string().uuid())
//   .addField('name', z.string())
//   .addOptionalField('nickname', z.string())
//   .addArrayField('tags', z.string())
//   .addNestedObject('profile', new ZodBuilder()
//     .addField('age', z.number().min(0))
//     .addOptionalField('bio', z.string())
//   );

  
// const userSchemaBuild = userBuilder.build();

// const parsed = userSchemaBuild.parse({
//   id: '1a2b3c4d-1234-5678-9999-000000000000',
//   name: 'John',
//   tags: ['dev', 'typescript'],
//   profile: {
//     age: 30
//   }
// });

