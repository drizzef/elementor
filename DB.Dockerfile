FROM mysql:5.7

ENV MYSQL_ALLOW_EMPTY_PASSWORD=true
ENV MYSQL_PASSWORD=elementor_dev
ENV MYSQL_USER=elementor_dev
ENV MYSQL_DATABASE=elementor_dashboard

RUN mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'elementor_dev';"