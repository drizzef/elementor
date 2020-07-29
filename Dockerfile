FROM mysql:8

# Set default schema and user/password
ENV MYSQL_DATABASE=elementor_dashboard
ENV MYSQL_USER="elementor_dev"
ENV MYSQL_PASSWORD="elementor_dev"
