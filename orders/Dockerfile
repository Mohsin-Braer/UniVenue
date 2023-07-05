FROM node:alpine

WORKDIR /app

# COPY tsconfig.json .
COPY package.json .

RUN npm install --omit=dev

COPY . .

CMD ["npm", "start"]

