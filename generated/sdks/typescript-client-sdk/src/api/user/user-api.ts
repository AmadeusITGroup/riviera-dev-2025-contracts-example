import { BaseUser } from '../../models/base/base-user/index';
import { User } from '../../models/base/user/index';
import { Api, ApiClient, ApiTypes, computePiiParameterTokens, isJsonMimeType, ParamSerializationOptions, RequestBody, RequestMetadata, } from '@ama-sdk/core';

/** Parameters object to UserApi's createUser function */
export interface UserApiCreateUserRequestData {
  /** User to add */
  'BaseUser': BaseUser;
}
/** Parameters object to UserApi's deleteUser function */
export interface UserApiDeleteUserRequestData {
  /** Id of the user */
  'userId': string;
}
/** Parameters object to UserApi's getUsers function */
export interface UserApiGetUsersRequestData {
}
/** Parameters object to UserApi's updateUser function */
export interface UserApiUpdateUserRequestData {
  /** Id of the user */
  'userId': string;
  /** User to update */
  'BaseUser'?: BaseUser;
}
export class UserApi implements Api {

  /** API name */
  public static readonly apiName = 'UserApi';

  /** @inheritDoc */
  public readonly apiName = UserApi.apiName;

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
   * Creates a new user
   * @param data Data to provide to the API call
   * @param metadata Metadata to pass to the API call
   */
  public async createUser(data: UserApiCreateUserRequestData, metadata?: RequestMetadata<'application/json', 'application/json'>): Promise<User> {
    const metadataHeaderAccept = metadata?.headerAccept || 'application/json';
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': metadata?.headerContentType || 'application/json',
      ...(metadataHeaderAccept ? {'Accept': metadataHeaderAccept} : {})
    };

    let body: RequestBody = '';
    if (headers['Content-Type'] && isJsonMimeType(headers['Content-Type'])) {
      body = typeof data['BaseUser'] !== 'undefined' ? JSON.stringify(data['BaseUser']) : '{}';
    } else {
      body = data['BaseUser'] as any;
    }

    let queryParams = {};
    const paramSerializationOptions: ParamSerializationOptions = {
      enableParameterSerialization: this.client.options.enableParameterSerialization
    };
    const basePath = `${this.client.options.basePath}/users`;
    const tokenizedUrl = `${this.client.options.basePath}/users`;
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

    const ret = this.client.processCall<User>(url, options, ApiTypes.DEFAULT, UserApi.apiName, undefined, 'createUser');
    return ret;
  }

  /**
   * 
   * Deletes a user
   * @param data Data to provide to the API call
   * @param metadata Metadata to pass to the API call
   */
  public async deleteUser(data: UserApiDeleteUserRequestData, metadata?: RequestMetadata<string, 'application/json'>): Promise<void> {
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
      const pathParamsProperties = this.client.getPropertiesFromData(data, ['userId']);
      const pathParamSerialization = { userId: { explode: false, style: 'simple' } };
      const serializedPathParams = this.client.serializePathParams(pathParamsProperties, pathParamSerialization);
      basePath = `${this.client.options.basePath}/users/${serializedPathParams['userId']}`;
      tokenizedUrl = `${this.client.options.basePath}/users/${this.piiParamTokens['userId'] || serializedPathParams['userId']}`;
    } else {
      basePath = `${this.client.options.basePath}/users/${data['userId']}`;
      tokenizedUrl = `${this.client.options.basePath}/users/${this.piiParamTokens['userId'] || data['userId']}`;
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

    const ret = this.client.processCall<void>(url, options, ApiTypes.DEFAULT, UserApi.apiName, undefined, 'deleteUser');
    return ret;
  }

  /**
   * 
   * Returns all the users
   * @param data Data to provide to the API call
   * @param metadata Metadata to pass to the API call
   */
  public async getUsers(data: UserApiGetUsersRequestData, metadata?: RequestMetadata<string, 'application/json'>): Promise<User[]> {
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
    const basePath = `${this.client.options.basePath}/users`;
    const tokenizedUrl = `${this.client.options.basePath}/users`;
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

    const ret = this.client.processCall<User[]>(url, options, ApiTypes.DEFAULT, UserApi.apiName, undefined, 'getUsers');
    return ret;
  }

  /**
   * 
   * Updates a user
   * @param data Data to provide to the API call
   * @param metadata Metadata to pass to the API call
   */
  public async updateUser(data: UserApiUpdateUserRequestData, metadata?: RequestMetadata<'application/json', 'application/json'>): Promise<User> {
    const metadataHeaderAccept = metadata?.headerAccept || 'application/json';
    const headers: { [key: string]: string | undefined } = {
      'Content-Type': metadata?.headerContentType || 'application/json',
      ...(metadataHeaderAccept ? {'Accept': metadataHeaderAccept} : {})
    };

    let body: RequestBody = '';
    if (headers['Content-Type'] && isJsonMimeType(headers['Content-Type'])) {
      body = typeof data['BaseUser'] !== 'undefined' ? JSON.stringify(data['BaseUser']) : '{}';
    } else {
      body = data['BaseUser'] as any;
    }

    let queryParams = {};
    const paramSerializationOptions: ParamSerializationOptions = {
      enableParameterSerialization: this.client.options.enableParameterSerialization
    };
    let basePath;
    let tokenizedUrl;
    if (this.client.options.enableParameterSerialization) {
      const pathParamsProperties = this.client.getPropertiesFromData(data, ['userId']);
      const pathParamSerialization = { userId: { explode: false, style: 'simple' } };
      const serializedPathParams = this.client.serializePathParams(pathParamsProperties, pathParamSerialization);
      basePath = `${this.client.options.basePath}/users/${serializedPathParams['userId']}`;
      tokenizedUrl = `${this.client.options.basePath}/users/${this.piiParamTokens['userId'] || serializedPathParams['userId']}`;
    } else {
      basePath = `${this.client.options.basePath}/users/${data['userId']}`;
      tokenizedUrl = `${this.client.options.basePath}/users/${this.piiParamTokens['userId'] || data['userId']}`;
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

    const ret = this.client.processCall<User>(url, options, ApiTypes.DEFAULT, UserApi.apiName, undefined, 'updateUser');
    return ret;
  }

}
