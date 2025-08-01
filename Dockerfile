FROM node:22-alpine
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.12.1

# Copy configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml esbuild.config.js ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build artifacts
RUN pnpm build

CMD ["node", "build/index.js", "--shttp"]
