
/**
 * In order to make a string a palindrome, we can reverse the string & attach it with the original!
 * abcaa -> aacba -> abcaaaacba
 * So max operations required to convert a string in to a palindrome are len(s). We can convert any string
 * to a palindrome by making len(s) insertions
 * 
 * Keep the longest palindrome portion intact & insert the non-matching string in reverse order
 * 
 * n - LPS !! Longest Palindromic Subsequence!
 */