import { App, CfnOutput, Duration, Stack } from "aws-cdk-lib";
import {
  FunctionUrlAuthType,
  InvokeMode,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

class ModelFetchExampleAWSLambdaTypeScriptStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const nodejsFunction = new NodejsFunction(this, "NodejsFunction", {
      entry: "./src/index.ts",
      runtime: Runtime.NODEJS_22_X,
      timeout: Duration.minutes(5),
    });

    const functionUrl = nodejsFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      invokeMode: InvokeMode.RESPONSE_STREAM,
    });

    new CfnOutput(this, "McpServerUrl", { value: functionUrl.url });
  }
}

const app = new App();

new ModelFetchExampleAWSLambdaTypeScriptStack(
  app,
  "ModelFetchExampleAWSLambdaTypeScriptStack",
);
