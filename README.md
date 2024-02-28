# wip-sam-node-llama-cpp

## This is still a work in progress. Needs improvement with time to first byte (TTFB).

A project using node-llama-cpp on AWS Lambda managed via AWS SAM.

## Prerequisites

Ensure you have the following installed and set up:

- **AWS Account**: Sign up or log in at [AWS](https://aws.amazon.com/).
- **AWS SAM CLI**: Follow the [installation guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
- **Docker**: Install from [Docker](https://www.docker.com/products/docker-desktop/).
- **GGUF LLM Model**: For this example, download `mistral-7b-instruct-v0.2.Q2_K.gguf` from [Hugging Face](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF) and place it in the project root.

## Quick Start

### Build and Deploy

1. **Build**: Compile the application with AWS SAM.
   ```bash
   sam build
   ```
2. **Deploy**: Launch your application to AWS. Follow the guided prompts to configure deployment.
   ```bash
   sam deploy --guided
   ```

### Local Testing

To build and test locally:

1. **Build**: Compile your application.
   ```bash
   sam build
   ```
2. **Test**: Invoke the function locally with Docker.
   ```bash
   sam local invoke
   ```

### Cleanup

Remove your application from AWS:

```bash
sam delete
```

## Deployment Notes

- If using a different LLM model than `mistral-7b-instruct-v0.2.Q2_K.gguf`, update `index.js` and `Dockerfile` accordingly.
- During deployment, you'll configure settings such as **Stack Name**, **AWS Region**, and IAM role permissions. Default settings are often sufficient for a quick start.
- Choices made during the guided deployment can be saved to `samconfig.toml` for easier future deployments.
