FROM mysql:8.0.34

ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes

COPY ./data.sql.enc /docker-entrypoint-initdb.d/

COPY ./entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3306

ENTRYPOINT ["entrypoint.sh"]
CMD ["mysqld"]
