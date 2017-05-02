db_name=$1
if [ "$db_name" = "" ]; then
    db_name="test"
fi
export db_name

docker-compose up
