#!/bin/sh

source .env

npx chromatic --project-token=$VITE_CHROMATIC_PROJECT_TOKEN -o storybook-static/
