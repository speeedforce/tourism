using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tourism.WebApp.Migrations
{
    public partial class Addseeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Forums",
                columns: new[] { "Id", "Created", "Description", "ImageUrl", "Title" },
                values: new object[] { 1, new DateTime(2021, 9, 17, 13, 18, 2, 420, DateTimeKind.Local).AddTicks(87), "Default Description", "", "Default" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "LastName", "PasswordHash", "Role", "Username" },
                values: new object[,]
                {
                    { 1L, "Admin", "User", "$2a$11$Ws37Y2uyUIg1Hx1/ANezyu8ZbYAaDVRfjgYI7spl4gjp1tpdod1D.", 0, "admin@gmail.com" },
                    { 2L, "Normal", "User", "$2a$11$wC9mpcMhbs/AlBO1/zmuZe1EdNDvd0WAnf5C105jOAH61l74EEH4S", 1, "user@gmail.com" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Forums",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L);
        }
    }
}
