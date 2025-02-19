export interface MegaapiConfig {
  hostUrl: string;
  instanceKey: string;
  token: string;
  isValid?: boolean;
}

export interface ApiValidationResponse {
  status: number;
  message: string;
  instance?: {
    id: string;
    name: string;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
} 