import { z } from "zod";

export const paginationDtoModel = z
  .object({
    current_page: z.number(),
    prev_page: z.number().nullable(),
    next_page: z.number().nullable(),
    total_pages: z.number(),
  })
  .transform((paginationData) => ({
    currentPage: paginationData.current_page,
    prevPage: paginationData.prev_page,
    nextPage: paginationData.next_page,
    totalPages: paginationData.total_pages,
  }));

export type PaginationDto = z.infer<typeof paginationDtoModel>;

export const pageableDtoBaseModel = z.object({
  meta: z.object({ pagination: paginationDtoModel }),
});

export type PageableDto = z.infer<typeof pageableDtoBaseModel>;
