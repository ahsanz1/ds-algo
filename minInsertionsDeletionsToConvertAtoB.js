/**
 * NOTE: Any string A can be converted to any string B by making len(A) deletions & len(B)
 * insertions. In order to convert a string A to string B with min insertions & min deletions,
 * we will keep the LCS intact! So the deletions will be len(A) - LCS & insertions will be
 * len(B) - LCS.
 * minAtoB = len(A) + len(B) - 2 * len(LCS)
 */