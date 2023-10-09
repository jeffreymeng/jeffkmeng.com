"use client";

import React from "react";
import Page from "@/components/Page";
import { Editor } from "@monaco-editor/react";
import "./monaco-hidecursor.css";
export default function AlgosPage() {
  return (
    <Editor
      height="100vh"
      language="python"
      theme="vs-dark"
      options={{
        readOnly: true,
        domReadOnly: true,
      }}
      defaultValue={`# TODO: add lazy propagation and allow range updates
class Segtree:
    def __init__(self, size: int, operator = add, default = 0):
        """Creates a segtree with the given capacity, associative operator, and default."""
        self.size = size # the logical size of the array the segtree represents
        self.default = default # the default element

        # the actual tree, stored in an array where the children of the ith element sit at 2i+1 and 2i+2
        self.tree = [0] * (4 * self.size)

        self.join = operator # the join operator

    def fill(self, arr, ti = 0, start = 0, end = None):
        """Fills the tree index ti with arr[start:end]. Returns self for chaining"""
        if end is None:
            end = self.size
        assert start <= end
        if start == end - 1:
            self.tree[ti] = arr[start]
            return self
        leftIndex = 2*ti + 1
        mid = (start + end) // 2
        self.fill(arr, leftIndex, start, mid)
        self.fill(arr, leftIndex + 1, mid, end)
        self.tree[ti] = self.join(self.tree[leftIndex], self.tree[leftIndex + 1])
        return self

    def update(self, i, x, ti = 0, start = 0, end = None):
        """Sets the ith element to x. Returns self for chaining"""
        if end is None:
            end = self.size

        if not start <= i < end:
            return self
        if start == i == end - 1:
            self.tree[ti] = x
            return self
        leftIndex = 2*ti + 1
        mid = (start + end) // 2
        self.update(i, x, leftIndex, start, mid)
        self.update(i, x, leftIndex + 1, mid, end)
        self.tree[ti] = self.join(self.tree[leftIndex], self.tree[leftIndex + 1])
        return self

    def query(self, start, end, ti = 0, curStart = 0, curEnd = None):
        """Queries the combination of all elements in the range arr[start:end].
            [start:end] represents the target interval, and [curStart:curEnd] represents
            the current interval that the recursive function is processing"""
        if curEnd is None:
            curEnd = self.size
        assert start < end, "Invalid range!"
        assert curStart <= curEnd

        if start >= curEnd or end <= curStart:
            # [start:end] and [arrStart:arrEnd] have no overlap
            return self.default
        elif curStart >= start and curEnd <= end:
            # [curStart:curEnd] is entirely inside [start:end]
            # this is the base case
            return self.tree[ti]
        leftIndex = 2*ti + 1
        mid = (curStart + curEnd) // 2

        # handle the two cases where [start:end] is entirely on the left or right of mid
        if end <= mid:
            return self.query(start, end, leftIndex, curStart, mid)
        if start >= mid:
            return self.query(start, end, leftIndex + 1, mid, curEnd)

        # otherwise break it into the ranges [start:mid] and [mid:end] since we know start <= mid < end
        return self.join(
            self.query(start, end, leftIndex, curStart, mid),
            self.query(start, end, leftIndex + 1, mid, curEnd)
        )
`}
    />
  );
}
