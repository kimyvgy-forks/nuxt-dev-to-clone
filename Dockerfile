FROM node:14-alpine as build

WORKDIR /build

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# final stage
FROM node:14-alpine

ARG VERSION=""

WORKDIR /srv/nuxt-dev-to-clone

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY . .
COPY --from=build /build/.nuxt .nuxt

ENV VERSION="${VERSION}"

CMD [ "yarn", "start" ]
