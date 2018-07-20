FROM node:10.5.0-alpine@sha256:92f749eb7f99240cad108616985696469484f680dd227af24241465f2d3a147f

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT npm start