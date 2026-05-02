---
title: Abstract measure theory 
date: 2026-05-02
categories:
  - writings
tags:
  - measure theory 
  - lebesgue integral 
---

<!--more--> 

## 1. $\sigma -$Algebras

For any fixed set $X$ denote by $2^X$ the set of all subsets of $X$ and, for any
subset $A \subset X$, denote by $A^c := X \setminus A$ its complement.

### 1.1 Definition (Measurable Space)
 
Let $X$ be a set. A collection $\mathcal{A} \subset 2^X$ of subsets of $X$ is called a $\sigma$-algebra if it satisfies the following axioms:

$\text{(a)} \quad$ $X \in \mathcal{A}.$

$\text{(b)}\quad$ If $A \in \mathcal{A}$, then $A^c \in \mathcal{A}.$

$\text{(c)} \quad$ Every countable union of elements of $\mathcal{A}$ is again an element of $\mathcal{A}$, i.e., if  
$A_i \in \mathcal{A}$ for $i = 1, 2, 3, \dots$ then  $ \bigcup_{i=1}^{\infty} A_i \in \mathcal{A}. $

A **measurable space** is a pair $(X, \mathcal{A})$ consisting of a set $X$ and a $\sigma$-algebra $\mathcal{A} \subset 2^X$.  
The elements of a $\sigma$-algebra $\mathcal{A}$ are called **measurable sets**.

### 1.2 Lemma   
Every $\sigma$-algebra $\mathcal{A} \subset 2^X$ satisfies the following:

$\text{(d)} \quad$ $\emptyset \in \mathcal{A}.$

$\text{(e)} \quad$ If $n \in \mathbb{N}$ and $A_1, \dots, A_n \in \mathcal{A}$, then $ \bigcup_{i=1}^{n} A_i \in \mathcal{A}. $

$\text{(f)} \quad$ Every finite or countable intersection of elements of $\mathcal{A}$ is an element of $\mathcal{A}$, i.e., $ \bigcap_{i=1}^{\infty} A_i \in \mathcal{A}. $

$\text{(g)} \quad$ If $A, B \in \mathcal{A}$, then $ A \setminus B \in \mathcal{A}. $

### 1.3 Lemma   
Let $X$ be a set and $\mathcal{E} \subset 2^X$ be any set of subsets of $X$. Then there is a unique smallest $\sigma$-algebra $\mathcal{A} \subset 2^X$ containing $\mathcal{E}$ (i.e., $\mathcal{A}$ is a $\sigma$-algebra, $\mathcal{E} \subset \mathcal{A}$, and if $\mathcal{B}$ is any other $\sigma$-algebra with $\mathcal{E} \subset \mathcal{B}$, then $\mathcal{A} \subset \mathcal{B}$).

*Proof.*

Uniqueness follows directly from the definition. Namely, if $\mathcal{A}$ and $\mathcal{B}$ are two smallest $\sigma$-algebras containing $\mathcal{E}$, we have both $\mathcal{B} \subset \mathcal{A}$ and $\mathcal{A} \subset \mathcal{B}$ and hence $\mathcal{A} = \mathcal{B}$.

To prove existence, denote by $\mathcal{S} \subset 2^{2^X}$ the collection of all $\sigma$-algebras $\mathcal{B} \subset 2^X$ that contain $\mathcal{E}$ and define
$$
\mathcal{A} := \bigcap_{\mathcal{B} \in \mathcal{S}} \mathcal{B}
= \left\\{ A \subset X \\middle|\ \text{if } \mathcal{B} \subset 2^X \text{ is a } \sigma\text{-algebra such that } \mathcal{E} \subset \mathcal{B}, \text{ then } A \in \mathcal{B} \right\\}.
$$

Thus $\mathcal{A}$ is a $\sigma$-algebra. Moreover, it follows directly from the definition of $\mathcal{A}$ that $\mathcal{E} \subset \mathcal{A}$ and that every $\sigma$-algebra $\mathcal{B}$ that contains $\mathcal{E}$ also contains $\mathcal{A}$. This proves the lemma. 

-- The letter “$\sigma$” stands for “countable,” and the crucial observation is that axiom (c) allows for countable unions. On the one hand, this is much more general than only allowing for finite unions, which would be the subject of **Boolean algebra**. On the other hand, it is much more restrictive than allowing for arbitrary unions, which one encounters in topology.

### 1.4 Definition (Topological Space) 
Let $X$ be a set. A collection $\mathcal{U} \subset 2^X$ of subsets of $X$ is called a topology on $X$ if it satisfies the following axioms:

$\text{(a)} \quad$ $\emptyset, X \in \mathcal{U}.$

$\text{(b)} \quad$ If $n \in \mathbb{N}$ and $U_1, \dots, U_n \in \mathcal{U}$, then  $ \bigcap_{i=1}^{n} U_i \in \mathcal{U}. $

$\text{(c)} \quad$ If $I$ is any index set and $U_i \in \mathcal{U}$ for $i \in I$, then $
\bigcup_{i \in I} U_i \in \mathcal{U}.
$

A **topological space** is a pair $(X, \mathcal{U})$ consisting of a set $X$ and a topology $\mathcal{U} \subset 2^X$. If $(X, \mathcal{U})$ is a topological space, the elements of $\mathcal{U}$ are called **open sets**, and a subset $F \subset X$ is called **closed** if its complement is open, i.e., $F^c \in \mathcal{U}$. Thus finite intersections of open sets are open and arbitrary unions of open sets are open. Likewise, finite unions of closed sets are closed and arbitrary intersections of closed sets are closed.

### 1.5 Definition (Borel $\sigma$-algebra)
Let $(X, \mathcal{U})$ be a topological space and let $\mathcal{B} \subset 2^X$ be the smallest $\sigma$-algebra containing $\mathcal{U}$. Then $\mathcal{B}$ is called the **Borel $\sigma$-algebra** of $(X, \mathcal{U})$ and the elements of $\mathcal{B}$ are called **Borel (measurable) sets**.

### 1.6 Lemma  
Let $(X, \mathcal{U})$ be a topological space. Then the following holds:

$\text{(i)} \quad$ Every closed subset $F \subset X$ is a Borel set.

$\text{(ii)} \quad$ Every countable union $\bigcup_{i=1}^{\infty} F_i$ of closed subsets $F_i \subset X$ is a Borel set (these are sometimes called $F_\sigma$-sets). 

$\text{(iii)} \quad$ Every countable intersection  $ \bigcap_{i=1}^{\infty} U_i$  of open subsets $U_i \subset X$ is a Borel set (these are sometimes called $G_\delta$-sets).

---
## 2. Measurable function 

For any map $f : X \to Y$ between two sets $X$ and $Y$ and any subset $B \subset Y$, the **pre-image**
$$
f^{-1}(B) := \\{ x \in X \mid f(x) \in B \\}
$$
of $B$ under $f$ is a well-defined subset of $X$, whether or not the map $f$ is bijective, i.e., even if there does not exist any map $f^{-1} : Y \to X$.

The pre-image defines a map from $2^Y$ to $2^X$. It satisfies
$$
f^{-1}(Y) = X, \qquad f^{-1}(\emptyset) = \emptyset,
$$
and preserves union, intersection, and complement. Thus
$$
f^{-1}(Y \setminus B) = X \setminus f^{-1}(B) 
$$
for every subset $B \subset Y$, and
$$
f^{-1}\left( \bigcup_{i \in I} B_i \right)
= \bigcup_{i \in I} f^{-1}(B_i), \qquad
f^{-1}\left( \bigcap_{i \in I} B_i \right)
= \bigcap_{i \in I} f^{-1}(B_i)
$$
for every collection of subsets $B_i \subset Y$, indexed by a set $I$.

### 2.1 Definition (Measurable Function)

$\text{(i)} \quad$ Let $(X, \mathcal{A}_X)$ and $(Y, \mathcal{A}_Y)$ be measurable spaces. A map $f : X \to Y$ is called **measurable** if the pre-image of every measurable subset of $Y$ under $f$ is a measurable subset of $X$, i.e.,
$$
B \in \mathcal{A}_Y \;\Rightarrow\; f^{-1}(B) \in \mathcal{A}_X.
$$

$\text{(ii)} \quad$ Let $(X, \mathcal{A}_X)$ be a measurable space. A function $f : X \to \overline{\mathbb{R}}$ is called **measurable** if it is measurable with respect to the Borel $\sigma$-algebra on $\overline{\mathbb{R}}$ associated to the standard topology. 

$\text{(iii)} \quad$ Let $(X, \mathcal{U}_X)$ and $(Y, \mathcal{U}_Y)$ be topological spaces. A map $f : X \to Y$ is called **Borel measurable** if the pre-image of every Borel measurable subset of $Y$ under $f$ is a Borel measurable subset of $X$.

### 2.2 Definition (Characteristic function)

Let $X$ be a set. The **characteristic function** of a subset $A \subset X$ is the function $\chi_A : X \to \mathbb{R}$ defined by
$$
\chi_A(x) :=
\begin{cases}
1, & \text{if } x \in A, \\\\
0, & \text{if } x \notin A.
\end{cases}
$$

Now assume $(X, \mathcal{A})$ is a measurable space, consider the Borel $\sigma$-algebra on $\mathbb{R}$, and let $A \subset X$ be any subset. Then $\chi_A$ is a measurable function if and only if $A$ is a measurable set.

### 2.3 Theorem (Measurable Maps)
Let $(X, \mathcal{A}_X)$, $(Y, \mathcal{A}_Y)$, and $(Z, \mathcal{A}_Z)$ be measurable spaces.

$\text{(i)} \quad$ The identity map $\mathrm{id}_X : X \to X$ is measurable.

$\text{(ii)} \quad$ If $f : X \to Y$ and $g : Y \to Z$ are measurable maps, then so is the composition $g \circ f : X \to Z$.

$\text{(iii)} \quad$ Let $f : X \to Y$ be any map. Then the set
$$
f_* \mathcal{A}_X := \left\\{ B \subset Y \ \middle| \ f^{-1}(B) \in \mathcal{A}_X \right\\}
$$
is a $\sigma$-algebra on $Y$, called the **pushforward of $\mathcal{A}_X$ under $f$**.

$\text{(iv)} \quad$ A map $f : X \to Y$ is measurable if and only if $\mathcal{A}_Y \subset f _* \mathcal{A}_X$.

### 2.4 Theorem (Measurable and Continuous Maps) 
Let $(X, \mathcal{A}_X)$ and $(Y, \mathcal{A}_Y)$ be measurable spaces. Assume $\mathcal{U}_Y \subset 2^Y$ is a topology on $Y$ such that $\mathcal{A}_Y$ is the Borel $\sigma$-algebra of $(Y, \mathcal{U}_Y)$.

$\text{(i)} \quad$ A map $f : X \to Y$ is measurable if and only if the pre-image of every open subset $V \subset Y$ under $f$ is measurable, i.e.,
$$
V \in \mathcal{U}_Y \qquad \Longrightarrow \qquad f^{-1}(V) \in \mathcal{A}_X.
$$

$\text{(ii)} \quad$ Assume $\mathcal{U}_X \subset 2^X$ is a topology on $X$ such that $\mathcal{A}_X$ is the Borel $\sigma$-algebra of $(X, \mathcal{U}_X)$. Then every continuous map $f : X \to Y$ is (Borel) measurable.

### 2.5 Theorem (Characterization of Measurable Functions)
Let $(X, \mathcal{A})$ be a measurable space and let $f : X \to \mathbb{R}$ be any function. Then the following are equivalent:

$\text{(i)} \quad$ $f$ is measurable.

$\text{(ii)} \quad$ $f^{-1}((a, \infty])$ is a measurable subset of $X$ for every $a \in \mathbb{R}$.

$\text{(iii)} \quad$ $f^{-1}([a, \infty])$ is a measurable subset of $X$ for every $a \in \mathbb{R}$.

$\text{(iv)} \quad$ $f^{-1}([-\infty, b))$ is a measurable subset of $X$ for every $b \in \mathbb{R}$.

$\text{(v)} \quad$ $f^{-1}([-\infty, b])$ is a measurable subset of $X$ for every $b \in \mathbb{R}$.

Next, we will show that sums, products, and limits of measurable functions are again measurable. The next two results are useful for the proofs of these fundamental facts. 

### 2.6 Theorem (Vector Valued Measurable Functions)
Let $(X, \mathcal{A})$ be a measurable space and let $f = (f_1, \dots, f_n) : X \to \mathbb{R}^n$ be a function. Then $f$ is measurable if and only if $f_i : X \to \mathbb{R}$ is measurable for each $i$.

### 2.7 Lemma
Let $(X, \mathcal{A})$ be a measurable space and let $u, v : X \to \mathbb{R}$ be measurable functions. If $\varphi : \mathbb{R}^2 \to \mathbb{R}$ is continuous, then the function $h : X \to \mathbb{R}$ defined by
$$
h(x) := \varphi(u(x), v(x))
$$
for $x \in X$ is measurable.

### 2.8 Theorem (Properties of Measurable Functions)
Let $(X, \mathcal{A})$ be a measurable space.

$\text{(i)} \quad$  If $f, g : X \to \mathbb{R}$ are measurable functions, then so are the functions  $$f + g,\qquad fg,\qquad \max\\{f, g\\},\qquad \min\{f, g\},\qquad |f|.$$

$\text{(ii)} \quad$ Let $f_k : X \to \overline{\mathbb{R}}$, $k = 1, 2, 3, \dots$, be a sequence of measurable functions. Then the following functions from $X$ to $\overline{\mathbb{R}}$ are measurable:
$$
\inf_k f_k, \qquad \sup_k f_k, \qquad \limsup_{k \to \infty} f_k, \qquad \liminf_{k \to \infty} f_k.
$$

### 2.9 Definition (Step Function)
Let $X$ be a set. A function $s : X \to \mathbb{R}$ is called a **step function**(or **simple function**) if it takes on only finitely many values, i.e., the image $s(X)$ is a finite subset of $\mathbb{R}$.

-- Let $s : X \to \mathbb{R}$ be a step function. Write $ s(X) = \\{\alpha_1, \dots, \alpha_\ell\\}, \text{with } \alpha_i \neq \alpha_j \text{ for } i \neq j,
$
and define $
A_i := s^{-1}(\alpha_i) = \\{ x \in X \mid s(x) = \alpha_i \\} \text{ for } i = 1, \dots, \ell.
$
Then the sets $A_1, \dots, A_\ell$ form a partition of $X$, i.e.,
$$
X = \bigcup_{i=1}^{\ell} A_i, \quad A_i \cap A_j = \emptyset \text{ for } i \neq j. 
$$

Moreover,
$$
s = \sum_{i=1}^{\ell} \alpha_i \chi_{A_i},
$$
where $\chi_{A_i} : X \to \mathbb{R}$ is the characteristic function of the set $A_i$ for $i = 1,\dots, \ell$. In this situation, $s$ is measurable if and only if each set $A_i \subset X$ is measurable.

### 2.10 Theorem (Approximation)  
Let $(X, \mathcal{A})$ be a measuable space and let $f : X \to [0, \infty]$ be a function. Then $f$ is measurable if and only if there exists a sequence of measurable step functions $s_n : X \to [0, \infty)$ such that
$$
0 \le s_1(x) \le s_2(x) \le \cdots \le f(x), \qquad f(x) = \lim_{n \to \infty} s_n(x) \qquad \text{for all } x \in X.
$$

*Proof.*

If $f$ can be approximated by a sequence of measurable step functions, then $f$ is measurable. Conversely, suppose that $f$ is measurable. For $n \in \mathbb{N}$ define $\varphi_n : [0, \infty] \to \mathbb{R}$ by
$$
\varphi_n(t) :=
\begin{cases}
k 2^{-n}, & \text{if } k 2^{-n} \le t < (k+1)2^{-n}, \quad k = 0, 1, \dots, n2^n - 1, \\\\
n, & \text{if } t \ge n.
\end{cases}
$$

These functions are Borel measurable and satisfy $\varphi_n(0) = 0$ and $\varphi_n(\infty) = n$ for all $n$ as well as
$
t - 2^{-n} \le \varphi_n(t) \le \varphi_{n+1}(t) \le t
$
whenever $n \ge t > 0$. Thus
$$
\lim_{n \to \infty} \varphi_n(t) = t \qquad \text{for all } t \in [0, \infty].
$$

Hence the functions $s_n := \varphi_n \circ f$ satisfy the requirements of the theorem.

--- 

## 3. Integration of Nonnegative Functions

### 3.1 Definition (Measure)
Let $(X, \mathcal{A})$ be a measurable space. A **measure** on $(X, \mathcal{A})$ is a function
$$
\mu : \mathcal{A} \to [0, \infty]
$$
satisfying the following axioms:

$\text{(a)}$ $\mu$ is **$\sigma$-additive**, i.e., if $A_i \in \mathcal{A}$, $i = 1, 2, 3, \dots$, is a sequence of pairwise disjoint measurable sets, then
$$
\mu\left( \bigcup_{i=1}^{\infty} A_i \right)
= \sum_{i=1}^{\infty} \mu(A_i).
$$

$\text{(b)}$ There exists a measurable set $A \in \mathcal{A}$ such that $\mu(A) < \infty$.

A **measure space** is a triple $(X, \mathcal{A}, \mu)$ consisting of a set $X$, a $\sigma$-algebra $\mathcal{A} \subset 2^X$, and a measure $\mu : \mathcal{A} \to [0, \infty]$.

### 3.2 Theorem (Properties of Measures)
Let $(X, \mathcal{A}, \mu)$ be a measure space. Then the following holds:

$\text{(i)}$ $\mu(\emptyset) = 0.$

$\text{(ii)}$ If $n \in \mathbb{N}$ and $A_1, \dots, A_n \in \mathcal{A}$ such that $A_i \cap A_j = \emptyset$ for $i \neq j$, then
$$
\mu(A_1 \cup \cdots \cup A_n) = \mu(A_1) + \cdots + \mu(A_n).
$$

$\text{(iii)}$ If $A, B \in \mathcal{A}$ such that $A \subset B$, then $\mu(A) \le \mu(B)$.

$\text{(iv)}$ Let $A_i \in \mathcal{A}$ be a sequence such that $A_i \subset A_{i+1}$ for all $i$. Then
$$
\mu\left( \bigcup_{i=1}^{\infty} A_i \right) = \lim_{i \to \infty} \mu(A_i).
$$

$\text{(v)}$ Let $A_i \in \mathcal{A}$ be a sequence such that $A_i \supset A_{i+1}$ for all $i$. Then
$$
\mu(A_1) < \infty \qquad \Longrightarrow \qquad
\mu\left( \bigcap_{i=1}^{\infty} A_i \right) = \lim_{i \to \infty} \mu(A_i).
$$

#### Example 

**1.** Let $(X, \mathcal{A})$ be a measurable space and fix an element $x_0 \in X$. The **Dirac measure** at $x_0$ is the measure $\delta_{x_0} : \mathcal{A} \to [0, \infty]$ defined by
$$
\delta_{x_0}(A) :=
\begin{cases}
1, & \text{if } x_0 \in A, \\\\
0, & \text{if } x_0 \notin A,
\end{cases}
\qquad \text{for } A \in \mathcal{A}.
$$

**2.** Let $X$ be an uncountable set and let $\mathcal{A}$ be the $\sigma$-algebra of all subsets of $X$ that are either countable or have countable complements. Then the function $\mu : \mathcal{A} \to [0, 1]$ defined by $\mu(A) := 0$ when $A$ is countable and $\mu(A) := 1$ when $A^c$ is countable is a measure.

**3.**  Let $X = \bigcup\limits_{i \in I} A_i$ be a partition and let $\mathcal{A} \subset 2^X$ be the $\sigma$-algebra generated by this partition. Then any function $I \to [0, \infty]:$ $i \mapsto \alpha_i$ determines a measure $\mu : \mathcal{A} \to [0, \infty]$ via
$$
\mu(A_J) := \sum_{j \in J} \alpha_j,
$$
for $J \subset I$ and $ A_J = \bigcup\limits_{j \in J} A_j.$

### 3.3 Definition (Lebesgue Integral)
Let $(X, \mathcal{A}, \mu)$ be a measure space and let $E \in \mathcal{A}$ be a measurable set.

$\text{(i)} \quad$ Let $s : X \to [0, \infty)$ be a measurable step function of the form
$$
s = \sum_{i=1}^{n} \alpha_i \chi_{A_i} 
$$
with $\alpha_i \in [0, \infty)$ and $A_i \in \mathcal{A}$ for $i = 1, \dots, n$. The **(Lebesgue) integral** of $s$ over $E$ is the number $\int_E s \mathrm{d}\mu \in [0, \infty]$ defined by
$$
\int_E s \mathrm{d}\mu := \sum_{i=1}^{n} \alpha_i \mu(E \cap A_i). 
$$

$\text{(ii)} \quad$ Let $f : X \to [0, \infty]$ be a measurable function. The **(Lebesgue) integral** of $f$ over $E$ is the number $\int_E f \mathrm{d}\mu \in [0, \infty]$ defined by
$$
\int_E f \mathrm{d}\mu := \sup_{s \le f} \int_E s \mathrm{d}\mu,
$$
where the supremum is taken over all measurable step functions $s : X \to [0, \infty)$ that satisfy $s(x) \le f(x)$ for all $x \in X$.

### 3.4 Theorem (Basic Properties of the Lebesgue Integral)
Let $(X, \mathcal{A}, \mu)$ be a measure space and let $f, g : X \to [0, \infty]$ be measurable functions and let $E \in \mathcal{A}.$ Then the following holds:

$\text{(i)} \quad$ If $f \le g$ on $E$, then $
\int_E f \mathrm{d}\mu \le \int_E g \mathrm{d}\mu.
$

$\text{(ii)} \quad$ $
\int_E f \mathrm{d}\mu = \int_X f \chi_E \mathrm{d}\mu.
$

$\text{(iii)} \quad$ If $f(x) = 0$ for all $x \in E$, then $ \int_E f \mathrm{d}\mu = 0.$

$\text{(iv)} \quad$ If $\mu(E) = 0$, then $
\int_E f \mathrm{d}\mu = 0.
$

$\text{(v)} \quad$ If $A \in \mathcal{A}$ and $E \subset A$, then $
\int_E f \mathrm{d}\mu \le \int_A f \mathrm{d}\mu.
$

$\text{(vi)} \quad$ If $c \in [0, \infty)$ then $\int_E cf \mathrm{d}\mu = c \int_E f \mathrm{d} \mu.$

### 3.5 Lemma (Additivity for Step Functions)
Let $(X, \mathcal{A}, \mu)$ be a measure space and let $s, t : X \to [0, \infty)$ be measurable step functions.

$\text{(i)} \quad$ For every measurable set $E \in \mathcal{A}$,
$$
\int_E (s + t) \mathrm{d}\mu = \int_E s \mathrm{d}\mu + \int_E t \mathrm{d}\mu.
$$

(ii) If $E_1, E_2, E_3, \dots$ is a sequence of pairwise disjoint measurable sets, then
$$
\int_E s \mathrm{d}\mu = \sum_{k=1}^{\infty} \int_{E_k} s \mathrm{d}\mu,
\qquad \text{where } E = \bigcup_{k \in \mathbb{N}} E_k.
$$

### 3.6 Theorem ($\sigma$-Additivity of the Lebesgue Integral)

Let $(X, \mathcal{A}, \mu)$ be a measure space.

$\text{(i)} \quad$ If $f, g : X \to [0, \infty]$ are measurable and $E \in \mathcal{A}$, then
$$
\int_E (f + g) \mathrm{d}\mu = \int_E f \mathrm{d}\mu + \int_E g \mathrm{d}\mu. 
$$

$\text{(ii)} \quad$ Let $f_n : X \to [0, \infty]$ be a sequence of measurable functions and define
$$
f(x):= \sum_{n=1}^{\infty} f_n(x) \qquad \text{for } x \in X.
$$
Then $f : X \to [0, \infty]$ is measurable and, for every $E \in \mathcal{A}$,
$$
\int_E f \mathrm{d}\mu = \sum_{n=1}^{\infty} \int_E f_n \mathrm{d}\mu. 
$$

$\text{(iii)} \quad$ If $f : X \to [0, \infty]$ is measurable and $E_1, E_2, E_3, \dots$ is a sequence of pairwise disjoint measurable sets, then
$$
\int_E f \mathrm{d}\mu = \sum_{k=1}^{\infty} \int_{E_k} f \mathrm{d}\mu, \qquad E := \bigcup_{k \in \mathbb{N}} E_k.
$$

### 3.7 Theorem  
Let $(X, \mathcal{A}, \mu)$ be a measure space and let $f : X \to [0, \infty]$ be a measurable function. Then the function $\mu_f : \mathcal{A} \to [0, \infty]$, defined by
$$
\mu_f(E) := \int_E f \mathrm{d}\mu \qquad \text{for } E \in \mathcal{A}
$$
is a measure, and
$$
\int_E g \mathrm{d}\mu_f = \int_E f g \mathrm{d}\mu
$$
for every measurable function $g : X \to [0, \infty]$ and every $E \in \mathcal{A}$.

---

## 4. Integration of Real Valued Functions 

### 4.1 Definition (Lebesgue Integrable Functions)
Let $(X, \mathcal{A}, \mu)$ be a measure space. A function $f : X \to \mathbb{R}$ is called **(Lebesgue) integrable** or **$\mu$-integrable** if $f$ is measurable and $\int_X |f| \mathrm{d}\mu < \infty. $ Denote the set of $\mu$-integrable functions by
$$
\mathcal{L}^1(\mu) := \mathcal{L}^1(X, \mathcal{A}, \mu) := \\{ f : X \to \mathbb{R} \mid f \text{ is } \mu\text{-integrable} \\}.
$$

The Lebesgue integral of $f \in \mathcal{L}^1(\mu)$ over a set $E \in \mathcal{A}$ is the real number
$$
\int_E f \mathrm{d}\mu := \int_E f^+ \mathrm{d}\mu - \int_E f^- \mathrm{d}\mu 
$$
where the functions $f^\pm : X \to [0, \infty)$ are defined by
$$
f^+(x) := \max\\{f(x), 0\\}, \qquad f^-(x) := \max\\{-f(x), 0\\}.
$$

### 4.2 Theorem (Properties of the Lebesgue Integral)
Let $(X, \mathcal{A}, \mu)$ be a measure space. Then the following holds:

$\text{(i)} \quad$ The set $\mathcal{L}^1(\mu)$ is a real vector space and, for every $E \in \mathcal{A}$, the function $
\mathcal{L}^1(\mu) \to \mathbb{R}: f \mapsto \int_E f \mathrm{d}\mu $
is linear. That is, if $f, g \in \mathcal{L}^1(\mu)$ and $c \in \mathbb{R}$, then $f + g, cf \in \mathcal{L}^1(\mu)$ and
$$
\int_E (f + g) \mathrm{d}\mu = \int_E f \mathrm{d}\mu + \int_E g \mathrm{d}\mu, \qquad
\int_E cf \mathrm{d}\mu = c \int_E f \mathrm{d}\mu.
$$

$\text{(ii)} \quad$ For all $f, g \in \mathcal{L}^1(\mu)$ and all $E \in \mathcal{A}$,
$$
f \le g \text{ on } E \qquad \Longrightarrow\ \qquad \int_E f \mathrm{d}\mu \le \int_E g \mathrm{d}\mu.
$$

$\text{(iii)} \quad$ If $f \in \mathcal{L}^1(\mu)$, then $|f| \in \mathcal{L}^1(\mu)$ and, for all $E \in \mathcal{A}$,
$$
\left| \int_E f \mathrm{d}\mu \right| \le \int_E |f| \mathrm{d}\mu.
$$

$\text{(iv)} \quad$ If $f \in \mathcal{L}^1(\mu)$ and $E_1, E_2, E_3, \dots$ is a sequence of pairwise disjoint measurable sets, then
$$
\int_E f \mathrm{d}\mu = \sum_{k=1}^{\infty} \int_{E_k} f \mathrm{d}\mu, \qquad E = \bigcup_{k \in \mathbb{N}} E_k. 
$$

$\text{(v)} \quad$ For all $E \in \mathcal{A}$ and all $f \in \mathcal{L}^1(\mu)$,
$$
\int_E f \mathrm{d}\mu = \int_X f \chi_E \mathrm{d}\mu.
$$

$\text{(vi)} \quad$ Let $E \in \mathcal{A}$ and $f \in \mathcal{L}^1(\mu)$. If $\mu(E) = 0$ or $f|_E = 0$, then $ \int_E f \mathrm{d}\mu = 0.$

### 4.3 Theorem (Lebesgue Dominated Convergence Theorem)
Let $(X, \mathcal{A}, \mu)$ be a measure space, let $g : X \to [0, \infty)$ be an integrable function, and let $f_n : X \to \mathbb{R}$ be a sequence of integrable functions satisfying
$$
|f_n(x)| \le g(x) \quad \text{for all } x \in X \text{ and } n \in \mathbb{N}, 
$$
and converging pointwise to $f : X \to \mathbb{R}$, i.e.,
$$
f(x) = \lim_{n \to \infty} f_n(x) \quad \text{for all } x \in X. 
$$

Then $f$ is integrable and, for every $E \in \mathcal{A}$,
$$
\int_E f \mathrm{d}\mu = \lim_{n \to \infty} \int_E f_n \mathrm{d}\mu.
$$

---

## 1.5 Sets of Measure Zero

Assume throughout this section that $(X, \mathcal{A}, \mu)$ is a measure space. A **set of measure zero** (or **null set**) is a measurable set $N \in \mathcal{A}$ such that $\mu(N) = 0$. 

Let $\mathscr{P}$ be a name for some property that a point $x \in X$ may have, or not have, depending on $x$. For example, if $f : X \to [0, \infty]$ is a measurable function on $X$, then $\mathscr{P}$ could stand for the condition $f(x) > 0$, or for the condition $f(x) = 0$, or for the condition $f(x) = \infty$. Or if $f_n : X \to \mathbb{R}$ is a sequence of measurable functions, the property $\mathscr{P}$ could stand for the statement “the sequence $f_n(x)$ converges”.

In such a situation, we say that $\mathscr{P}$ holds **almost everywhere** if there exists a set $N \subset X$ of measure zero such that every element $x \in X \setminus N$ has the property $\mathscr{P}$. It is not required that the set of all elements $x \in X$ that have the property $\mathscr{P}$ is measurable, although that may often be the case.

### 5.1 Lemma 
Let $f : X \to [0, \infty]$ be a measurable function. If $ \int_X f \mathrm{d}\mu < \infty $ then $f < \infty$ almost everywhere.

*Proof.* 

Define $ N := \\{x \in X \mid f(x) = \infty\\} $ and $ h := \infty \chi_N.$
Then $h \le f$ and so
$$
\infty \mu(N) = \int_X h \mathrm{d}\mu \le \int_X f \mathrm{d}\mu < \infty
$$
Hence $\mu(N) = 0$.

### 5.2 Lemma 

Assume either that $f, g : X \to [0, \infty]$ are measurable functions that agree almost everywhere, or that $f, g : X \to \mathbb{R}$ are $\mu$-integrable functions that agree almost everywhere. Then
$$
\int_A f \mathrm{d}\mu = \int_A g \mathrm{d}\mu \qquad \text{for all } A \in \mathcal{A}.
$$

### 5.3 Lemma 

Assume either that $f : X \to [0, \infty]$ is measurable or that $f : X \to \mathbb{R}$ is $\mu$-integrable. Then the following are equivalent:

$\text{(i)}\quad$ $f = 0$ almost everywhere.

$\text{(ii)}\quad$ $\int_A f \mathrm{d}\mu = 0 $ for all $A \in \mathcal{A}$.

$\text{(iii)}\quad$ $ \int_X |f| \mathrm{d}\mu = 0.$

### 5.4 Lemma 

Let $f \in \mathcal{L}^1(\mu)$. Then
$$
\left| \int_X f \mathrm{d}\mu \right| = \int_X |f| \mathrm{d}\mu
$$
if and only if $f = |f|$ almost everywhere or $f = -|f|$ almost everywhere.

### 5.5 Theorem (Convergent Series of Integrable Functions)
Let $(X, \mathcal{A}, \mu)$ be a measure space and let $f_n : X \to \mathbb{R}$ be a sequence of $\mu$-integrable functions such that
$$
\sum_{n=1}^{\infty} \int_X |f_n| \mathrm{d}\mu < \infty. 
$$

Then there is a set $N$ of measure zero and a function $f \in \mathcal{L}^1(\mu)$ such that
$$
\sum_{n=1}^{\infty} |f_n(x)| < \infty \quad \text{and} \quad f(x) = \sum_{n=1}^{\infty} f_n(x) \qquad \text{for all } x \in X \setminus N, \tag{1}
$$

and
$$
\int_A f \mathrm{d}\mu = \sum_{n=1}^{\infty} \int_A f_n \mathrm{d}\mu \qquad \text{for all } A \in \mathcal{A}, \tag{2}
$$

and
$$
\lim_{n \to \infty}
\int_X \left| f - \sum_{k=1}^{n} f_k \right| \mathrm{d}\mu = 0. \tag{3}
$$

*Proof.*

Define
$$
\varphi(x) := \sum_{k=1}^{\infty} |f_k(x)|
$$
for $x \in X$. This function is measurable. Moreover, it follows from the Lebesgue Monotone Convergence Theorem that
$$
\int_X \varphi \mathrm{d}\mu = \lim_{n \to \infty} \int_X \sum_{k=1}^{n} |f_k| \mathrm{d}\mu = \lim_{n \to \infty} \sum_{k=1}^{n} \int_X |f_k| \mathrm{d}\mu = \sum_{k=1}^{\infty} \int_X |f_k| \mathrm{d}\mu < \infty.
$$

Hence the set $ N := \\{ x \in X \mid \varphi(x) = \infty  \\} $ has measure zero, and $ \sum_{k=1}^{\infty} |f_k(x)| < \infty $ for all $x \in X \setminus N$. Define the function $f : X \to \mathbb{R}$ by $ f(x) := 0$ for $x \in N$ and by 
$$
f(x) := \sum_{k=1}^{\infty} f_k(x) \qquad \text{for } x \in X \setminus N.
$$
Then $f$ satisfies (1).

Define the functions $g : X \to \mathbb{R}$ and $g_n : X \to \mathbb{R}$ by
$$
g := \varphi \chi_{X \setminus N}, \qquad
g_n := \sum_{k=1}^{n} f_k \chi_{X \setminus N}, \quad n \in \mathbb{N}.
$$

These functions are measurable. Moreover, $ \int_X g \mathrm{d}\mu = \int_X \varphi \mathrm{d}\mu < \infty .$ Since $|g_n(x)| \le g(x)$ for all $n \in \mathbb{N}$ and $g_n$ converges pointwise to $f$, it follows from the Lebesgue Dominated Convergence Theorem that $f \in \mathcal{L}^1(\mu)$ and, for all $A \in \mathcal{A}$,
$$
\int_A f \mathrm{d}\mu = \lim_{n \to \infty} \int_A g_n \mathrm{d}\mu = \lim_{n \to \infty} \int_A \sum_{k=1}^{n} f_k \mathrm{d}\mu = \sum_{n=1}^{\infty} \int_A f_n \mathrm{d}\mu.
$$

Here the second step follows from $g_n = \sum_{k=1}^{n} f_k$ almost everywhere. The last step follows by interchanging sum and integral and proves (2).

To prove equation (3), note that $f - \sum_{k=1}^{n} f_k = f - g_n$ almost everywhere, that $f(x) - g_n(x)$ converges to zero for all $x \in X$, and that $ |f - g_n| \le |f| + g, $ where $|f| + g$ is integrable. Hence, by the Lebesgue Dominated Convergence Theorem,
$$
\lim_{n \to \infty} \int_X \left| f - \sum_{k=1}^{n} f_k \right| d\mu = \lim_{n \to \infty} \int_X |f - g_n| \mathrm{d}\mu = 0.
$$

This proves (3) and the theorem.

### 5.6 Theorem (Completeness of $L^1$)
Let $(X, \mathcal{A}, \mu)$ be a measure space and let $f_n \in \mathcal{L}^1(\mu)$ be a sequence of integrable functions. Assume $(f_n)$ is a Cauchy sequence with respect to the $L^1$-norm, i.e., for every $\varepsilon > 0$ there exists $n_0 \in \mathbb{N}$ such that, for all $m, n \in \mathbb{N}$,
$$
n, m \ge n_0 \qquad \Longrightarrow \qquad \int_X |f_n - f_m| \mathrm{d}\mu < \varepsilon. 
$$

Then there exists a function $f \in \mathcal{L}^1(\mu)$ such that
$$
\lim_{n \to \infty} \int_X |f_n - f| \mathrm{d}\mu = 0.
$$

Moreover, there exists a subsequence $(f_{n_i})$ that converges almost everywhere to $f$.

---

## 6 Completion of a Measure Space

The discussion in Section 5 shows that sets of measure zero are negligible in the sense that the integral of a measurable function remains the same if the function is modified on a set of measure zero. Thus, also subsets of sets of measure zero can be considered negligible. However, such subsets need not be elements of our $\sigma$-algebra $\mathcal{A}$. It is sometimes convenient to form a new $\sigma$-algebra by including all subsets of sets of measure zero. This leads to the notion of a *completion* of a measure space $(X, \mathcal{A}, \mu)$.

### 6.1 Definition  
A measure space $(X, \mathcal{A}, \mu)$ is called **complete** if
$$
N \in \mathcal{A}, \quad \mu(N) = 0, \quad E \subset N \qquad \Longrightarrow \qquad E \in \mathcal{A}.
$$

### 6.2 Theorem  
Let $(X, \mathcal{A}, \mu)$ be a measure space and define
$$
\mathcal{A}^* :=
\left\\{
E \subset X \\middle|\
\text{there exist measurable sets } A, B \in \mathcal{A}
\text{ such that } A \subset E \subset B \text{ and } \mu(B \setminus A) = 0
\right\\}.
$$

Then the following holds:

$\text{(i)} \quad$ $\mathcal{A}^\*$ is a $\sigma$-algebra and $\mathcal{A} \subset \mathcal{A}^*$.

$\text{(ii)} \quad$ There exists a unique measure $\mu^* : \mathcal{A}^* \to [0, \infty]$ such that
$$
\mu^*|_{\mathcal{A}} = \mu.
$$

$\text{(iii)} \quad$ The triple $(X, \mathcal{A}^\*, \mu^*)$ is a complete measure space. It is called the **completion** of $(X, \mathcal{A}, \mu)$.

$\text{(iv)} \quad$ If $f : X \to \mathbb{R}$ is $\mu$-integrable, then $f$ is $\mu^\*$-integrable and, for $E \in \mathcal{A}$,
$$
\int_E f \mathrm{d}\mu^* = \int_E f \mathrm{d}\mu.
$$
This continues to hold for all $\mathcal{A}$-measurable functions $f : X \to [0, \infty]$.

$\text{(v)} \quad$ If $f^* : X \to \overline{\mathbb{R}}$ is $\mathcal{A}^\*$-measurable, then there exists an $\mathcal{A}$-measurable function $f : X \to \overline{\mathbb{R}}$ such that the set
$$
N^\* := \\{ x \in X \mid f(x) \ne f^\*(x) \\} \in \mathcal{A}^*
$$
has measure zero, i.e. $ \mu^\*(N^\*) = 0.$

## References 

[1] Salamon, D. A. (n.d.). *Measure and integration* (preprint). <a href="https://people.math.ethz.ch/~salamon/PREPRINTS/measure.pdf">https://people.math.ethz.ch/~salamon/PREPRINTS/measure.pdf</a> 