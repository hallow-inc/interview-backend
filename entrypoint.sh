#!/usr/bin/env bash
set -e

echo "Decrypting data.."

ENCRYPTED_FILE="/docker-entrypoint-initdb.d/data.sql.enc"
DECRYPTED_FILE="/docker-entrypoint-initdb.d/00-data.sql"

if openssl enc -aes-256-cbc -d -pbkdf2 -in "$ENCRYPTED_FILE" -out "$DECRYPTED_FILE" -k "$MYSQL_ROOT_PASSWORD" 2>/dev/null; then
    echo "Database decrypted successfully!"
    rm "$ENCRYPTED_FILE"
else
    echo "ERROR: Failed to decrypt database. Incorrect password provided."
    exit 1
fi

exec docker-entrypoint.sh "$@"
