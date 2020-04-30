j = 1
black = (0, 2, 5, 7, 10, 12)
for i in range(1, 53):
    i2 = i%12
    if i2 in black:
        print("{0}, ".format(i), end="")
        j += 1
