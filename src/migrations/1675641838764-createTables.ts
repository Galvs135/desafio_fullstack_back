import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1675641838764 implements MigrationInterface {
    name = 'createTables1675641838764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(15) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "register_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "costumers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(15) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "register_date" TIMESTAMP NOT NULL DEFAULT now(), "userCostumersId" uuid, CONSTRAINT "PK_235ef3b889390c91380dbba01fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "costumers" ADD CONSTRAINT "FK_a74c9930455b750c93040ae3d17" FOREIGN KEY ("userCostumersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "costumers" DROP CONSTRAINT "FK_a74c9930455b750c93040ae3d17"`);
        await queryRunner.query(`DROP TABLE "costumers"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
