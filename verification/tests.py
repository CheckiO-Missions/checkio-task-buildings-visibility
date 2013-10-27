"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""
from random import randint


TESTS = {
    "0. Basics": [
        #First
        {
            "input":
                [
                    [1, 1, 4, 5, 3.5],
                    [2, 6, 4, 8, 5],
                    [5, 1, 9, 3, 6],
                    [5, 5, 6, 6, 8],
                    [7, 4, 10, 6, 4],
                    [5, 7, 10, 8, 3]
                ],
            "answer": 5,
            "explanation": [5, 1, 3, 4, 0, 2]
        },
        #Second
        {
            "input":
                [
                    [1, 1, 11, 2, 2],
                    [2, 3, 10, 4, 1],
                    [3, 5, 9, 6, 3],
                    [4, 7, 8, 8, 2]
                ],
            "answer": 2
        },
        #Third
        {
            "input":
                [
                    [1, 1, 3, 3, 6],
                    [5, 1, 7, 3, 6],
                    [9, 1, 11, 3, 6],
                    [1, 4, 3, 6, 6],
                    [5, 4, 7, 6, 6],
                    [9, 4, 11, 6, 6],
                    [1, 7, 11, 8, 3.25]
                ],
            "answer": 4
        },
        #Alone
        {
            "input":
                [
                    [0, 0, 1, 1, 10]
                ],
            "answer": 1
        },
        #Shadow
        {
            "input":
                [
                    [2, 2, 3, 3, 4],
                    [2, 5, 3, 6, 4]
                ],
            "answer": 1
        },
    ],
    "1. Extra": [
        #H1
        {
            "input":
                [
                    [1, 1, 3, 3, 20],
                    [3, 4, 5, 6, 10],
                    [5, 1, 7, 3, 20],
                    [1, 7, 7, 9, 20]
                ],
            "answer": 4
        },
        #H2
        {
            "input":
                [
                    [1, 1, 3, 3, 20],
                    [3, 4, 5, 6, 20],
                    [5, 1, 7, 3, 20],
                    [1, 7, 7, 9, 20]

                ],
            "answer": 3
        },
        #H3
        {
            "input":
                [
                    [0, 1, 1, 2, 2.5],
                    [0, 3, 1, 4, 3.5],
                    [0, 5, 1, 6, 1.5],
                    [3, 0, 4, 2, 30],
                    [5, 0, 6, 2, 2],
                    [7, 0, 8, 2, 2],
                    [4, 3, 8, 4, 2],
                    [4, 5, 5, 6, 1],
                    [7, 5, 8, 6, 3]
                ],
            "answer": 7
        },
        #H4
        {
            "input":
                [
                    [0, 0, 10, 1, 10],
                    [3, 3, 4, 4, 1],
                    [5, 5, 6, 6, 1],
                    [7, 7, 8, 8, 1]
                ],
            "answer": 1
        },
    ],
    "2. Random": [
        #Half-Random
        {
            "input":
                [
                    [0, 0, 10, 1, 10],
                    [3, 3, 4, 4, randint(1, 9)],
                    [5, 5, 6, 6, randint(1, 9)],
                ],
            "answer": 1
        },

        #Half-Random
        {
            "input":
                [
                    [1, 1, 2, 2, 1],
                    [randint(3, 5), randint(3, 5), randint(6, 8), randint(6, 8), 1]
                ],
            "answer": 2
        },
    ]
}
