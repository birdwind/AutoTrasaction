package com.birdwind.autoTransaction.base.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageUtils {

    public final static Integer DEFAULT_PAGE = 0;

    public final static Integer DEFAULT_SIZE = 10;

    public static Pageable getPageable(Integer page, Integer size, String... properties) {
        if (page == null || page < 0) {
            page = DEFAULT_PAGE;
        }

        if (size == null || size < 0) {
            size = DEFAULT_SIZE;
        }

        return PageRequest.of(page, size, Sort.Direction.DESC, properties);
    }

    public static Pageable getPageable(Integer page, Integer size, Sort.Direction direction, String... properties) {
        if (page == null || page < 0) {
            page = DEFAULT_PAGE;
        }

        if (size == null || size < 0) {
            size = DEFAULT_SIZE;
        }

        return PageRequest.of(page, size, direction, properties);
    }

    public static Pageable getPageable(Integer page, Integer size, Sort sort) {
        if (page == null || page < 0) {
            page = DEFAULT_PAGE;
        }

        if (size == null || size < 0) {
            size = DEFAULT_SIZE;
        }

        if (sort == null) {
            return PageRequest.of(page, size, Sort.Direction.DESC);
        }

        return PageRequest.of(page, size, sort);
    }

    public static Pageable getPageable(Integer page, Integer size) {
        if (page == null || page < 0) {
            page = DEFAULT_PAGE;
        }

        if (size == null || size < 0) {
            size = DEFAULT_SIZE;
        }

        return PageRequest.of(page, size, Sort.Direction.DESC);
    }

    public static Pageable getPageable() {
        return PageRequest.of(DEFAULT_PAGE, DEFAULT_SIZE);
    }

}
