using Microsoft.EntityFrameworkCore.Migrations;

namespace Tourism.Server.Migrations
{
    public partial class Updatedb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Forums_ForumId",
                table: "Articles");

            migrationBuilder.AlterColumn<int>(
                name: "ForumId",
                table: "Articles",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Forums_ForumId",
                table: "Articles",
                column: "ForumId",
                principalTable: "Forums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Forums_ForumId",
                table: "Articles");

            migrationBuilder.AlterColumn<int>(
                name: "ForumId",
                table: "Articles",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Forums_ForumId",
                table: "Articles",
                column: "ForumId",
                principalTable: "Forums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
