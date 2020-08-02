#!/bin/bash
set -e

# Run migrations
exec yarn installation

exec "$@"