## What Is Immutability?

First off, immutable is the opposite of mutable – and mutable means changeable, modifiable… able to be messed with.

So something that is immutable, then, is something that cannot be changed.

Taken to an extreme, this means that instead of having traditional variables, you’d be constantly creating new values and replacing old ones. JavaScript is not this extreme, but some languages are – Elixir, Erlang, Lisp, ML, Clojure… all the “real” functional languages.

While JavaScript isn’t a purely functional language, it can sorta pretend to be sometimes. Certain Array operations in JS are immutable (meaning that they return a new array, instead of modifying the original). String operations are always immutable (they create a new string with the changes). And you can write your own functions that are immutable, too. You just need to be aware of a few rules.


#### In order to be pure a function must follow these rules:

- A pure function must always return the same value when given the same inputs.
- A pure function must not have any side effects.
- A pure function can only call other pure functions


source https://daveceddia.com/react-redux-immutability-guide/?utm_campaign=0918immutability
