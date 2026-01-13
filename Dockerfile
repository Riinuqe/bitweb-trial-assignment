FROM node:20-alpine

WORKDIR /app

# Copy dependency files first for caching
COPY package.json package-lock.json* ./

RUN npm install

# Copy rest of the project
COPY . .

EXPOSE 6006

CMD ["npm", "run", "storybook", "--", "--ci", "--port", "6006"]
