FROM public.ecr.aws/lambda/nodejs:20

COPY index.js package*.json mistral-7b-instruct-v0.2.Q2_K.gguf ./

RUN npm ci --production

CMD ["index.handler"]
