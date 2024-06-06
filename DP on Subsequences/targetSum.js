/**
 * QUESTION: You're given an array of numbers & a target. You have to assign signs + or - to numbers
 * such that their sum = target. [1, 2, 3, 1]
 *                               [+, -, +, -] = 3
 * You have to find the number of ways we can get 3. Different combinations of signs that give us the target 3.
 * This is the same problem as countPartitionsWithGivenDifference
 * S1 - S2 = D
 * We have to divide the array in 2 partitions, one with +ve numbers & one with -ve numbers & then sum them to get D.
 * [-,+,+,-]
 * 2 + 3 - 1 - 1 = 3
 */