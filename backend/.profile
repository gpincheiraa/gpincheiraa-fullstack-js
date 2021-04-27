OUTPUT_PATH="$(pwd)/firebase-service-account.json"

curl -X GET \
  -o $OUTPUT_PATH \
  $SERVICE_ACCOUNT_FILE_URL

export GOOGLE_APPLICATION_CREDENTIALS=$OUTPUT_PATH
