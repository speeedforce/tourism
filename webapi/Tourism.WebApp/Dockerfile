#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://*:5000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Tourism.WebApp/Tourism.WebApp.csproj", "./Tourism.WebApp/"]
COPY ["Tourism.Infrastructure/Tourism.Infrastructure.csproj", "./Tourism.Infrastructure/"]
COPY ["Tourism.Core/Tourism.Core.csproj", "./Tourism.Core/"]
RUN dotnet restore "Tourism.WebApp/Tourism.WebApp.csproj"
COPY ./ ./
WORKDIR "/src/."
RUN dotnet build "./Tourism.Core/Tourism.Core.csproj" -c Release -o /app/build
RUN dotnet build "./Tourism.Infrastructure/Tourism.Infrastructure.csproj" -c Release -o /app/build
RUN dotnet build "./Tourism.WebApp/Tourism.WebApp.csproj" -c Release -o /app/build


FROM build as publish
RUN dotnet publish "./Tourism.WebApp/Tourism.WebApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tourism.WebApp.dll"]