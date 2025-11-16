'use client';

import React from "react";
import { Tweet } from "react-tweet";
import { LazyInView } from "./LazyInView";

interface LazyTweetProps {
  id: string;
}

export function LazyTweet({ id }: LazyTweetProps) {
  return (
    <LazyInView>
      <Tweet id={id} />
    </LazyInView>
  );
}

export default LazyTweet;
