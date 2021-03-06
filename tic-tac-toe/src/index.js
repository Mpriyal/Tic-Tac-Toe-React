import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props){
    return (
        <button className="square"
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={()=>this.props.onClick(i)}
        />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
    </div>
    </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current  = history[history.length-1];
        const newSquares = current.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = this.state.xIsNext ? 'X' :'O';
        this.setState(
            {history: history.concat([{
                squares: newSquares
                }]),
                stepNumber: history.length,
                xIsNext : !this.state.xIsNext,
            });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step%2)===0,
        });
    }

    checkStatus(winner,status) {
        if(winner!=null) {
            console.log(winner);
            if(this.state.xIsNext) {
                status = 'Wohoo! ' +
                    'Player 2 Wins!';
            }
            else {
                status = 'Wohoo! ' +
                    'Player 1 Wins!';
            }
        }
        else if(this.state.stepNumber===9) {
            status = "Game Over! Go to Game Start!";
        }
        else if(this.state.xIsNext){
            status = 'Next Turn: Player 1';
        }
        else {
            status = 'Next Turn: Player 2';
        }
        return status
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status = null;
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move # ' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{this.checkStatus(winner,status)}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8],
    ];
    for (let i=0;i<lines.length;i++) {
        const [a,b,c] = lines[i];
        //check if we get three 'O' or 'X' in a row, column or diagonally (as per the logic of winning of the game)
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
