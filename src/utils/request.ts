type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // 支持的 HTTP 方法
  headers?: Record<string, string>; // 自定义请求头
  body?: any; // 请求体
  params?: Record<string, any>; // 查询参数
};

export default function fetchRequest(url: string, options: FetchOptions) {
  const baseUrl = '/api'; // 基础URL，可从环境变量配置/api

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const { headers, method = 'GET', body, params } = options;

  // 构建 URL 带参数
  const queryString = params
    ? '?' +
    new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = value == null ? '' : value; // 防止 null 或 undefined
        return acc;
      }, {})
    ).toString()
    : '';

  return fetch(`${baseUrl}${url}${queryString}`, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: response.statusText,
        }));
        throw new Error(error.message || '请求失败');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Fetch Request Error:', error);
      throw error;
    });
}
