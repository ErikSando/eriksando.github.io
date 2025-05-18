let InstructionsMessage = "";

InstructionsMessage += "This webpage was made to make a school assignment easier, the functionalities include:\n";
InstructionsMessage += "- Matrix addition, subtraction, and multiplication.\n"
InstructionsMessage += "- Inverting a 2x2 matrix.\n"
InstructionsMessage += "- Encoding and decoding messages using matrix multiplication.\n\n";
InstructionsMessage += "How to make a matrix:\n- Enter the following command: let [matrix name] = new Matrix([rows], [columns])\n";
InstructionsMessage += "- This will create a matrix with the desired number of rows and columns.\n";
InstructionsMessage += "To set the value of the matrix, you can pass in a third argument which is an array containing the values, or by using [matrix name].SetValue([array of values]).\n"
InstructionsMessage += "If you can't understand any of that, you can manually set the values using [matrix name].Set([row], [column], [value]).\n\n";

InstructionsMessage += "============================\n";
InstructionsMessage += "Example of creating a matrix\n";
InstructionsMessage += "============================\n\n";
InstructionsMessage += "let matrix = new Matrix(2, 2, [[1, 2], [3, 4]]);\n\n";
InstructionsMessage += "This creates a matrix of order 2x2, the first row is 1 2, and the second row is 3 4. In written form the matrix will look like:\n"
InstructionsMessage += "[ 1  2 ]\n";
InstructionsMessage += "[ 3  4 ]\n\n";
InstructionsMessage += "There are also some pre-defined matrices you can use, shown below:\n\n";
InstructionsMessage += "Matrix.Identity(size) -> returns the identity matrix for the given size.\n";
InstructionsMessage += "Matrix.Zero(size) -> returns the zero matrix for the given size.\n\n";

InstructionsMessage += "=================\n";
InstructionsMessage += "Matrix Operations\n";
InstructionsMessage += "=================\n\n";
InstructionsMessage += "Matrix.Multiply(matrix1, matrix2): returns the product of matrix1 and matrix2, keep in mind that with matrices AB =/= BA, so make sure matrix1 and matrix2 are correct, and do not need to be switched.\n\n";
InstructionsMessage += "Matrix.Add(matrix1, matrix2): adds the two matrices.\n\n";
InstructionsMessage += "Matrix.Subtract(matrix1, matrix2): subtracts matrix2 from matrix1.\n\n";

InstructionsMessage += "================\n";
InstructionsMessage += "Matrix Functions\n";
InstructionsMessage += "================\n\n";
InstructionsMessage += "FYI: to use one of these functions, you type the name of the matrix followed by \".[function name]\", for example if you have a matrix named \"mymatrix\", you can use the Inverse function by typing mymatrix.Inverse()\n\n";
InstructionsMessage += "Inverse(): returns the inverse of the matrix. The matrix itself is not affected, so this must be assigned to a variable. For example, inverse = matrix.Inverse();\n\n";
InstructionsMessage += "Multiply(n): returns the matrix multiplied by n (a number). Same with Inverse(), this has to be assigned to a variable.\n\n";
InstructionsMessage += "Get(row, column): returns the number in the specified row and column of the matrix.\n\n";
InstructionsMessage += "Set(row, column, value): sets the value in the specified row and column to the specified value.\n\n";
InstructionsMessage += "Add(row, column, amount): adds the specified amount onto the value in the specified row and column.\n\n";
InstructionsMessage += "Subtract(row, column, amount): opposite of Add().\n\n";
InstructionsMessage += "Square(): returns the square of the matrix.\n\n";
InstructionsMessage += "Negative(): returns the matrix with all of the values inversed.\n\n";

InstructionsMessage += "==============================\n";
InstructionsMessage += "Encoding and Decoding Messages\n";
InstructionsMessage += "==============================\n\n";
InstructionsMessage += "EncodeMessage(message, key): encodes the message (a string) using the key matrix. The output of this function is an array of numbers.\n\n"
InstructionsMessage += "DecodeMessage(message, key): decodes the message (an array of numbers) using the key matrix. The key matrix is automatically inverted, so use the same matrix that was used to encode the message. The output of this function is a string.\n\n";
InstructionsMessage += "EncodeMessage2(message, key): same as EncodeMessage, but you can use all sorts of characters.\n\n"
InstructionsMessage += "DecodeMessage2(message, key): decodes a message encoded by EncodeMessage2().\n\n";
InstructionsMessage += "There are some more encoding and decoding functions but not all are completed and I'm too lazy to write any more here.";

console.log(InstructionsMessage);