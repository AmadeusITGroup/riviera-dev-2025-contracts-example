import { BaseTodo } from '../../models/base/base-todo/index';
import { Todo } from '../../models/base/todo/index';
import { TodoStatus } from '../../models/base/todo-status/index';
import { Api, ApiClient, ApiTypes, computePiiParameterTokens, isJsonMimeType, ParamSerializationOptions, RequestBody, RequestMetadata, } from '@ama-sdk/core';

/** Parameters object to TodoApi's createTodo function */
export interface TodoApiCreateTodoRequestData {
  /** Todo to add */
  'BaseTodo': BaseTodo;
}
/** Parameters object to TodoApi's deleteTodo function */
export interface TodoApiDeleteTodoRequestData {
  /** Id of the todo */
  'todoId': string;
}
/** Parameters object to TodoApi's getTodos function */
export interface TodoApiGetTodosRequestData {
  /**  */
  'user'?: string;
  /**  */
  'status'?: TodoStatus;
}
/** Parameters object to TodoApi's updateTodo function */
export interface TodoApiUpdateTodoRequestData {
  /** Id of the todo */
  'todoId': string;
  /** Status of the todo */
  'BaseTodo'?: BaseTodo;
}
export class TodoApi implements Api {

  /** API name */
  public static readonly apiName = 'TodoApi';

  /** @inheritDoc */
  public readonly apiName = TodoApi.apiName;

  /** Tokens of the parameters containing PII */
  public readonly piiParamTokens: { [key: string]: string } = computePiiParameterTokens([]);

  /** @inheritDoc */
  public client: ApiClient;

  /**
   * Initialize your interface
   *
   * @param apiClient Client used to process call to the API
   */
  constructor(apiClient: ApiClient) {
    this.client = apiClient;
  }

  /**
   * 
   * Creates a new todo
   * @param data Data to provide to the API call
   * @param metadata Metadata to pass to the API call
   */
  public async createTodo(data: TodoApiCreateTodoRequestData, metadata?: RequestMetadata<'application/json', 'application/json'>): Promise<Todo> {
    const metadataHeaderAccept = metadata?.headerAccept || 'application/json';
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': metadata?.headerContentType || 'application/json',
      ...(metadataHeaderAccept ? {'Accept': metadataHeaderAccept} : {})
    };

    let body: RequestBody = '';
    if (headers['Content-Type'] && isJsonMimeType(headers['Content-Type'])) {
      body = typeof data['BaseTodo'] !== 'undefined' ? JSON.stringify(data['BaseTodo']) : '{}';
    } else {
      body = data['BaseTodo'] as any;
    }

    let queryParams = {};
    const paramSerializationOptions: ParamSerializationOptions = {
      enableParameterSerialization: this.client.options.enableParameterSerialization
    };
    const basePath = `${this.client.options.basePath}/todos`;
    const tokenizedUrl = `${this.client.options.basePath}/todos`;
    const tokenizedOptions = this.client.tokenizeRequestOptions(tokenizedUrl, queryParams, this.piiParamTokens, data);

    const requestOptions = {
      headers,
      method: 'POST',
      basePath,
      queryParams,
      paramSerializationOptions,
      body: body || undefined,
      metadata,
      tokenizedOptions,
      api: this
    };

    const options = await this.client.getRequestOptions(requestOptions);
    const url = this.client.options.enableParameterSerialization ? this.client.prepareUrlWithQueryParams(options.basePath, options.queryParams) : this.client.prepareUrl(options.basePath, options.queryParams);

    const ret = this.client.processCall<Todo>(url, options, ApiTypes.DEFAULT, TodoApi.apiName, undefined, 'createTodo');
    return ret;
  }

  /**
   * 
   * Delete a todo
   * @param data Data to provide to the API call
   * @param metadata Metadata to pass to the API call
   */
  public async deleteTodo(data: TodoApiDeleteTodoRequestData, metadata?: RequestMetadata<string, 'application/json'>): Promise<void> {
    const metadataHeaderAccept = metadata?.headerAccept || 'application/json';
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': metadata?.headerContentType || 'application/json',
      ...(metadataHeaderAccept ? {'Accept': metadataHeaderAccept} : {})
    };

    let body: RequestBody = '';

    let queryParams = {};
    const paramSerializationOptions: ParamSerializationOptions = {
      enableParameterSerialization: this.client.options.enableParameterSerialization
    };
    let basePath;
    let tokenizedUrl;
    if (this.client.options.enableParameterSerialization) {
      const pathParamsProperties = this.client.getPropertiesFromData(data, ['todoId']);
      const pathParamSerialization = { todoId: { explode: false, style: 'simple' } };
      const serializedPathParams = this.client.serializePathParams(pathParamsProperties, pathParamSerialization);
      basePath = `${this.client.options.basePath}/todos/${serializedPathParams['todoId']}`;
      tokenizedUrl = `${this.client.options.basePath}/todos/${this.piiParamTokens['todoId'] || serializedPathParams['todoId']}`;
    } else {
      basePath = `${this.client.options.basePath}/todos/${data['todoId']}`;
      tokenizedUrl = `${this.client.options.basePath}/todos/${this.piiParamTokens['todoId'] || data['todoId']}`;
    }
    const tokenizedOptions = this.client.tokenizeRequestOptions(tokenizedUrl, queryParams, this.piiParamTokens, data);

    const requestOptions = {
      headers,
      method: 'DELETE',
      basePath,
      queryParams,
      paramSerializationOptions,
      body: body || undefined,
      metadata,
      tokenizedOptions,
      api: this
    };

    const options = await this.client.getRequestOptions(requestOptions);
    const url = this.client.options.enableParameterSerialization ? this.client.prepareUrlWithQueryParams(options.basePath, options.queryParams) : this.client.prepareUrl(options.basePath, options.queryParams);

    const ret = this.client.processCall<void>(url, options, ApiTypes.DEFAULT, TodoApi.apiName, undefined, 'deleteTodo');
    return ret;
  }

  /**
   * 
   * Returns all the todo
   * @param data Data to provide to the API call
   * @param metadata Metadata to pass to the API call
   */
  public async getTodos(data: TodoApiGetTodosRequestData, metadata?: RequestMetadata<string, 'application/json'>): Promise<Todo[]> {
    const metadataHeaderAccept = metadata?.headerAccept || 'application/json';
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': metadata?.headerContentType || 'application/json',
      ...(metadataHeaderAccept ? {'Accept': metadataHeaderAccept} : {})
    };

    let body: RequestBody = '';

    let queryParams = {};
    const queryParamsProperties = this.client.getPropertiesFromData(data, ['user', 'status']);
    const paramSerializationOptions: ParamSerializationOptions = {
      enableParameterSerialization: this.client.options.enableParameterSerialization
    };
    if (this.client.options.enableParameterSerialization) {
      const queryParamSerialization = { user: { explode: true, style: 'form' }, status: { explode: true, style: 'form' } };
      queryParams = this.client.serializeQueryParams(queryParamsProperties, queryParamSerialization);
      paramSerializationOptions.queryParamSerialization = queryParamSerialization;
    } else {
      queryParams = this.client.stringifyQueryParams(queryParamsProperties);
    }
    const basePath = `${this.client.options.basePath}/todos`;
    const tokenizedUrl = `${this.client.options.basePath}/todos`;
    const tokenizedOptions = this.client.tokenizeRequestOptions(tokenizedUrl, queryParams, this.piiParamTokens, data);

    const requestOptions = {
      headers,
      method: 'GET',
      basePath,
      queryParams,
      paramSerializationOptions,
      body: body || undefined,
      metadata,
      tokenizedOptions,
      api: this
    };

    const options = await this.client.getRequestOptions(requestOptions);
    const url = this.client.options.enableParameterSerialization ? this.client.prepareUrlWithQueryParams(options.basePath, options.queryParams) : this.client.prepareUrl(options.basePath, options.queryParams);

    const ret = this.client.processCall<Todo[]>(url, options, ApiTypes.DEFAULT, TodoApi.apiName, undefined, 'getTodos');
    return ret;
  }

  /**
   * 
   * Updates the status of a todo
   * @param data Data to provide to the API call
   * @param metadata Metadata to pass to the API call
   */
  public async updateTodo(data: TodoApiUpdateTodoRequestData, metadata?: RequestMetadata<'application/json', 'application/json'>): Promise<Todo> {
    const metadataHeaderAccept = metadata?.headerAccept || 'application/json';
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': metadata?.headerContentType || 'application/json',
      ...(metadataHeaderAccept ? {'Accept': metadataHeaderAccept} : {})
    };

    let body: RequestBody = '';
    if (headers['Content-Type'] && isJsonMimeType(headers['Content-Type'])) {
      body = typeof data['BaseTodo'] !== 'undefined' ? JSON.stringify(data['BaseTodo']) : '{}';
    } else {
      body = data['BaseTodo'] as any;
    }

    let queryParams = {};
    const paramSerializationOptions: ParamSerializationOptions = {
      enableParameterSerialization: this.client.options.enableParameterSerialization
    };
    let basePath;
    let tokenizedUrl;
    if (this.client.options.enableParameterSerialization) {
      const pathParamsProperties = this.client.getPropertiesFromData(data, ['todoId']);
      const pathParamSerialization = { todoId: { explode: false, style: 'simple' } };
      const serializedPathParams = this.client.serializePathParams(pathParamsProperties, pathParamSerialization);
      basePath = `${this.client.options.basePath}/todos/${serializedPathParams['todoId']}`;
      tokenizedUrl = `${this.client.options.basePath}/todos/${this.piiParamTokens['todoId'] || serializedPathParams['todoId']}`;
    } else {
      basePath = `${this.client.options.basePath}/todos/${data['todoId']}`;
      tokenizedUrl = `${this.client.options.basePath}/todos/${this.piiParamTokens['todoId'] || data['todoId']}`;
    }
    const tokenizedOptions = this.client.tokenizeRequestOptions(tokenizedUrl, queryParams, this.piiParamTokens, data);

    const requestOptions = {
      headers,
      method: 'PUT',
      basePath,
      queryParams,
      paramSerializationOptions,
      body: body || undefined,
      metadata,
      tokenizedOptions,
      api: this
    };

    const options = await this.client.getRequestOptions(requestOptions);
    const url = this.client.options.enableParameterSerialization ? this.client.prepareUrlWithQueryParams(options.basePath, options.queryParams) : this.client.prepareUrl(options.basePath, options.queryParams);

    const ret = this.client.processCall<Todo>(url, options, ApiTypes.DEFAULT, TodoApi.apiName, undefined, 'updateTodo');
    return ret;
  }

}
