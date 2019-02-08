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
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    handleClick(i) {
        const newSquares = this.state.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = this.state.xIsNext? 'X' :'O';
        this.setState(
            {squares: newSquares,
                xIsNext : !this.state.xIsNext,
            });
    }

    checkStatus(winner,status) {
        if(winner) {
            if(this.state.xIsNext) {
                status = 'Wohoo! ' +
                    'Player 1 Wins!';
            }
            else {
                status = 'Wohoo! ' +
                    'Player 2 Wins!';
            }
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
        const current = history[history.length-1];
        const winner = calculateWinner(current.squares);
        const status = null;
        return (
            <div className="game">
                <div className="game-board">
                    <div>{this.checkStatus(winner,status)}</div>
                    <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <ol>{/* TODO */}</ol>
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
