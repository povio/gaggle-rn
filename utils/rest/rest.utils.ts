// oxlint-disable no-unsafe-type-assertion
import { type AxiosError, type AxiosResponse, isAxiosError } from "axios";
import { z } from "zod";

export namespace RestUtils {
  export const extractServerResponseCode = (e: unknown): string | null => {
    if (e instanceof z.ZodError) {
      return "validation-exception";
    }

    if (!isAxiosError(e)) {
      return null;
    }

    if (!e.response) {
      return null;
    }

    const data = e.response.data as { code: unknown } | undefined;

    if (typeof data?.code === "string") {
      return data.code;
    }

    return null;
  };

  /**
   * @deprecated should use response codes instead
   */
  export const doesServerErrorMessageContain = (e: AxiosError, text: string): boolean => {
    const message = extractServerErrorMessage(e);
    if (message == null) {
      return false;
    }

    return message.toLowerCase().includes(text.toLowerCase());
  };

  export const extractServerErrorMessage = (e: unknown): string | null => {
    if (e instanceof z.ZodError) {
      return e.message;
    }

    if (!isAxiosError(e)) {
      return null;
    }

    if (!e.response) {
      return null;
    }

    const data = e.response.data as { message: unknown } | undefined;

    if (typeof data?.message === "string") {
      return data.message;
    }

    return null;
  };

  export const extractContentDispositionFilename = (headers: AxiosResponse["headers"]) => {
    const contentDisposition = headers["content-disposition"] as string | undefined;
    return contentDisposition ? /filename=["']?([^"';]+)/i.exec(contentDisposition)?.[1] : undefined;
  };
}
