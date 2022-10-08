def print_matrix(matrix):
    """
    displays the 2D matrix in an easier to read format
    
    Parameters:
        matrix: (2D int array) matrix to print
    """
    for row in matrix:
        print(row)
        

def get_min_diagonal(matrix,skip_index=[]):
    """
    gets the min index of the diagonal of a matrix (diagonals representing the total number of times that racer has raced thus far)
    
    Parameters:
        matrix: (2D int array) matrix to get min diagonal
        skip_index: (OPTIONAL) (1D int array) indexes to skip 
        
    Returns:
        index of the min excluding the skipped indexes
    """
    min_index = -1
    for i in range(len(matrix)):
        if i not in skip_index:
            if min_index == -1 or matrix[i][i] < matrix[min_index][min_index]:
                min_index=i
            
    return min_index


def add_racers_to_matrix(r1,r2,r3,r4,matrix):
    """
    Adds the racers to the matrix
    """
    matrix[r1][r1] = matrix[r1][r1]+1
    matrix[r2][r2] = matrix[r2][r2]+1
    matrix[r3][r3] = matrix[r3][r3]+1
    matrix[r4][r4] = matrix[r4][r4]+1
    matrix[r1][r2] = matrix[r1][r2]+1
    matrix[r2][r1] = matrix[r2][r1]+1
    matrix[r1][r3] = matrix[r1][r3]+1
    matrix[r3][r1] = matrix[r3][r1]+1
    matrix[r1][r4] = matrix[r1][r4]+1
    matrix[r4][r1] = matrix[r4][r1]+1
    matrix[r2][r3] = matrix[r2][r3]+1
    matrix[r3][r2] = matrix[r3][r2]+1
    matrix[r2][r4] = matrix[r2][r4]+1
    matrix[r4][r2] = matrix[r4][r2]+1
    matrix[r3][r4] = matrix[r3][r4]+1
    matrix[r4][r3] = matrix[r4][r3]+1