interface Response<TResult> {
  isError: boolean;
  success: TResult | null;
  error: {
    code: number;
    message: string;
  } | null;
}

//Handles request to an outgoing service, handles the error in go style where it returns the value alongside the error
//This is because it is better to explicitly handle the request that can always fail for some unknown reason
function useRequest(base: RequestInfo | URL = "") {
  const post = async <TResult>(
    URL: RequestInfo | URL,
    obj?: object
  ): Promise<[Response<TResult>["success"], Response<TResult>["error"]]> => {
    try {
      const result = await fetch(`${base}/${URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const body = (await result.json()) as Response<TResult>;

      if (body.isError) {
        return [null, body.error];
      }

      return [body.success, null];
    } catch (e) {
      if (e instanceof Error) {
        return [null, { code: 0, message: e.message }];
      }

      throw e;
    }
  };

  return { post };
}
export default useRequest;
