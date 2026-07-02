---
title: Banach space
date: 2025-10-08
update: 2026-04-27
categories:
  - writings
tags:
  - functional analysis 
  - banach space
---

<!--more--> 

# Normed Spaces and Banach Spaces

## 1. Definition (Normed Space, Banach Space)
A normed space $X$ is a vector space with a norm defined on it. A Banach space is a complete normed space (complete in the metric defined by the norm). Here, a norm on a (real or complex) vector space $X$ is a real-valued function on $X$ whose value at an $x \in X$ is denoted by $\\\| x \\\|$ (real "norm of $X$") and which has the properties:
1. $\\|x\\| \ge 0$
2. $\\|x\\| = 0 \iff x = 0$
3. $\\|\alpha x\\| = \|\alpha\|\\|x\\|$
4. $\\|x + y\\| \le \\|x\\| + \\|y\\|$ $\quad$ (Triangle inequality)

A norm on $X$ defines a metric $d$ on $X$ by
$$
d(x,y) = \\|x - y\\|,
$$
called the *metric induced* by the norm. The normed space thus defined is denoted by $(X, \\| \cdot\\|)$, or simply $X$.

### Example
**1. Euclidean space  $\mathbb{R}^n$ and unitary space $\mathbb{C}^n$**. 
Banach space with norm 
$$
\\|x\\| = \left( \sum_{i=1}^{n} \|x_i\|^2 \right)^{\frac{1}{2}}
$$
$\mathbb{R}^n$ and $\mathbb{C}^n$ are complete and the induced metric is
$$
d(x,y) = \\|x - y\\| = \left( \sum_{i=1}^{n} |x_i - y_i|^2 \right)^{\frac{1}{2}}.
$$

**2. Space $\ell^p$.**
Banach space with norm  
$$ \\|x\\| = \left( \sum_{i = 1}^{\infty} \|x_i\|^p \right)^{\frac{1}{p}} $$ 
and the induced metric is 
$$
d(x, y) = \\|x - y\\| = \left( \sum_{i=1}^{n} |x_i - y_i|^p \right)^{\frac{1}{p}}.
$$

**3. Space $\ell^{\infty}$.**
Banach space with norm  
$$
\\|x\\|_\infty = \sup _{i}\\|x_i\\|
$$

**4 Space $C[a, b]$.**
Banach space with norm  
$$
\\|x\\| = \max _{t \in J}\\|x(t)\\|
$$
where $J = [a,b]$.

**5. Incomplete normed space.**

$d(x, y) = \int _{0}^{1} \| x(t) - y(t) \| \mathrm{d}t$ induce the norm 
$$\int _{0}^{1} \|x(t)\| \mathrm{d}t$$

**6. Incomplete normed space and its completion $L^p[a,b]$.**
The Banach space $L^p[a,b]$ with norm 
$$ \\|x\\| _p = \left( \int _{a}^{b} \|x(t)\| \mathrm{d}t  \right)^{\frac{1}{p}} $$

**7. Space $s$.**
Metric defined by $$d(x,y) = \sum _{j = 1}^{\infty} \dfrac{1}{2^j} \dfrac{\|x_j-y_j\|}{1 + \|x_j-y_j\|}$$ 
cannot be obtained a norm

### 1.1 Lemma (Translation invariance)
A metric $d$ induced by a norm on a normed space $X$ satisfies 

$\text{(a)} \quad$ $d(x+a,y+a) = d(x,y)$

$\text{(b)} \quad$ $d(\alpha x, \alpha y) = \|\alpha\| d(x,y)$

for all $x,y \in X$ and every scalar $\alpha$. 

---

## 2. Further properties of normed space

### 2.1 Theorem (Subspace of Banach space) 

A subspace $Y$ of a Banach space $X$ is complete if and only if $Y$ is closed in $X$. 

-- **Convergence of sequences**
   1. A sequence $(x_n)$ in a normed space $X$ is convergent if $X$ contains an $x$ such that 
$$\lim _{n \to \infty} \\|x_n - x \\| = 0.$$

Then we write $x_n \to x$ and call $x$ the limit of $(x_n)$.

2. A sequence $(x_n)$ in a normed space $X$ is Cauchy if for every $\epsilon > 0$ there is an $N$ such that $$\\|x_m - x_n\\| < \epsilon \quad \forall m, n > N$$ 

-- **Infinite series** $(x_k)$ is a sequence in a normed space $X$, we can associate with $(x_k)$ the sequence $(s_n)$ of partial sums $$s_n = x_1 + x_2 + \ldots + x_n.$$

If $(s_n)$ is convergent,
$
s_n \to s,
$
or $\\|s_n - s\\| \to 0$ then the infinite series $\sum_{k = 1}^\infty x_k$ is said to converge, $s$ is called the sum of the series and we write
$$
s = \sum_{k=1}^{\infty} x_k = x_1 + x_2 + \ldots.
$$

If
$
\sum_{k=1}^{\infty} \\|x_k\\|
$
converges, then the series is said to be *absolutely convergent*.

-- **Basis.** A normed space $X$ contains a sequence $(e_n)$ with the property that for every $x \in X$ here is a unique sequence of scalars $(\alpha_n)$ such that
$$
\\|x - \sum_{k=1}^{n} \alpha_k e_k\\| \to 0 \quad \text{ (as } n \to \infty)
$$
then $(e_n)$ is called a **Schander basis** for $X$. The series $\sum_{k=1}^{\infty} \alpha_k e_k$ which has the sum $x$ is then called the expansion of $x$ with to $(e_n)$, and we write 
$$x = \sum_{k=1}^{\infty} \alpha_k e_k$$

#### Example 
$\ell^p$ has a Schauder, namely $(e_n),$ where $e_n = (\delta_{nj})$, that is, $e_n$ is the sequence whose $n^{\text{th}}$ term is 1 and all other term are zero; thus
$$
e_1 = (1,0,0,\dots), \quad
e_2 = (0,1,0,\dots), \quad
e_3 = (0,0,1,\dots), \ \text{etc.}
$$

### 2.1 Theorem  (Completion)

Let $X = (X, \\|\cdot\\|)$ be a normed space. Then there exists a Banach space $\tilde{X}$ and an isometry $A$ from $X$ onto a subspace $W$ of $\tilde{X}$ which is dense in $\tilde{X}$. The space $\tilde{X}$ is unique, except for isometris. 

--- 

## 3. Finite Dimensional Normed Spaces and Subspaces.

### 3.1 Lemma (Linear combination)
Let $\\{ x_1, \ldots, x_n \\}$ be a linearly independent set of vectors in a normed space $X$ (of any dimension). Then there is a number $c > 0$ such that for every choice of scalars $\alpha_1, \ldots, \alpha_n$ we have  
\begin{equation}
\\| \alpha_1x_1 + \ldots + \alpha_n x_n \\| \ge c(\| \alpha_1 \| + \ldots + \|\alpha_n\|) \tag{1}
\end{equation} 

*Proof.*

We write $S = |a_1| + \cdots + |a_n|$. If $S = 0$, all $\alpha_j$ are zero, so (1) holds for any $c$. Let $S > 0$. Then (1) is equivalent to the inequality which we obtain from (1) by dividing $S$ and writing $\beta_j = \dfrac{\alpha_j}{S}$, that is

\begin{equation}
\left\\| \beta_1 x_1 + \cdots + \beta_n x_n \right\\| \ge c
\qquad \left( \sum_{j=1}^n |\beta_j| = 1 \right)  \tag{2} 
\end{equation} 

Suppose for the contradiction, there exists a sequence $(y_m)$ of vectors

$$
y_m = \beta_1^{(m)} x_1 + \cdots + \beta_n^{(m)} x_n
$$

such that
$
\|y_m\| \to 0 \quad \text{as } m \to \infty.
$

Since
$
\sum_{j=1}^n \left|\beta_j^{(m)}\right| = 1,
$
we have $\left|\beta_j^{(m)}\right| \le 1$. Hence for each $j$, the sequence
$$
\left(\beta_j^{(m)}\right) = \left(\beta_j^{(1)}, \beta_j^{(2)}, \dots\right)
$$
is bounded. Consequently, by the Bolzano-Weierstrass theorem, $\left(\beta_j^{(m)}\right)$ has a convergent subsequence. Let $\beta_1$ denote the limit of that subsequence, let $(y_{1,m})$ denote the corresponding subsequence of $(y_m)$. By the same argument, $(y_{1,m})$ has a subsequence $(y_{2,m})$ for which the corresponding subsequence of scalars $\beta_j^{(m)}$ converges; let $\beta_2$ denote the limit. Continuing in this way, after $n$ steps we obtain a subsequence

$$
(y_{n,m}) = (y_{n,1}, y_{n,2}, \dots)
$$

of $(y_m)$ whose terms are of the form

$$
y_{n,m} = \sum_{j=1}^n \gamma_j^{(m)} x_j.
$$

with scalars $\gamma_j^{(m)}$ satisfying
$
\gamma_j^{(m)} \to \beta_j \text{ as } m \to \infty.
$
Hence, as $m \to \infty$,
$
y_{n,m} \to y = \sum_{j=1}^n \beta_j x_j
$

where
$
\sum_{j=1}^n |\beta_j| = 1,
$
so that not all $\beta_j$ can be zero. Since $\\{x_1,\dots,x_n\\}$ is a linearly independent then $y \ne 0$.

On the other hand, $y_{n,m} \to y$ implies $\\|y_{n,m}\\| \to \\|y\\|$. Since $\\|y_m\\| \to 0$ by assumption and $(y_{n,m})$ is a subsequence of $(y_m)$, we must have $\\|y_{n,m}\\| \to 0$. Hence $\\|y\\| = 0$ so that $y = 0$ (contradiction).

### 3.2 Theorem (Completeness) 

Every finite dimensional subspace $Y$ of a normed space $X$ is complete. In particular, every finite dimensional normed space is complete.

*Proof.*

Consider an arbitrary Cauchy sequence $(y_m)$ in $Y$ and show that it is convergent in $Y$; the limit will be denoted by $y$.

Let $\dim Y = n$ and $\\{e_1,\ldots,e_n\\}$ any basis for $Y$. Then each $y_m$ has a unique representation of the form

$$
y_m = \alpha_1^{(m)} e_1 + \cdots + \alpha_n^{(m)} e_n.
$$

Since $(y_m)$ is a Cauchy sequence, for every $\varepsilon > 0$ there is an $N$ such that $\\|y_m - y_r\\| < \varepsilon$ when $m,r > N$. We have for some $c > 0$

$$
\varepsilon > \\|y_m - y_r\\|
= \left\\| \sum_{j=1}^n \left(\alpha_j^{(m)} - \alpha_j^{(r)}\right)e_j \right\\|
\ge c \sum_{j=1}^n \left|\alpha_j^{(m)} - \alpha_j^{(r)}\right|
$$

$$
\Rightarrow \left|a_j^{(m)} - a_j^{(r)}\right| \le \frac{\varepsilon}{c}.
$$

This shows that each of the $n$ sequences

$$
\left(\alpha_j^{(m)}\right)=\left(\alpha_j^{(1)},\alpha_j^{(2)},\ldots\right), \qquad j=1,\ldots,n
$$

is Cauchy in $\mathbb{R}$ or $\mathbb{C}$. Hence it converges; let $\alpha_j$ denote the limit. Using these $n$ limits $a_1,\ldots,a_n$, we define

$$
y=\alpha_1e_1+\cdots+\alpha_ne_n.
$$

Clearly, $y\in Y$ and

$$
\\|y_m-y\\| =
\left\\|\sum_{j=1}^n \left(\alpha_j^{(m)}-\alpha_j\right)e_j\right\\|
\le
\sum_{j=1}^n \left|\alpha_j^{(m)}-\alpha_j\right|\\|e_j\\|.
$$

On the right, $\alpha_j^{(m)}\to \alpha_j$. Hence $\\|y_m-y\\|\to 0$, that is $y_m\to y$.

This shows that $(y_m)$ is convergent in $Y$. Since $(y_m)$ was an arbitrary Cauchy sequence in $Y$, this proves that $Y$ is complete.

### 3.3 Theorem (Closedness)

Every finite dimensional subspace $Y$ of a normed space $X$ is closed in $X$.

### 3.4 Definition (Equivalent norms)

A norm $\\|\cdot\\|$ on a vector space $X$ is said to be equivalent to a norm $\|\cdot\|_0$ on $X$ if there are positive numbers $a$ and $b$ such that for all $x\in X$ we have

$$
a\\|x\\|_0 \le \\|x\\| \le b\\|x\\|_0.
$$

Equivalent norms on $X$ define the same topology for $X$.

### 3.5 Theorem (Equivalent norms)

On a finite dimensional vector space $X$ any norm $\\|\cdot\\|$ is equivalent to any other norm $\\|\cdot\\|_0$.

*Proof.*

Let $\dim X=n$ and $\{e_1,\ldots,e_n\}$ any basis for $X$. Then every $x\in X$ has a unique representation

$$
x=\alpha_1e_1+\cdots+\alpha_ne_n.
$$

Then there exists $c>0$ such that

$$
\\|x\\|\ge c\left(|a_1|+\cdots+|a_n|\right).
$$

On the other hand, the triangle inequality gives

$$
\\|x\\|_0 \le \sum _{j = 1}^n \left|\alpha_j \right|\\|e_j\\|_0 \le k \sum _{j=1}^n\|\alpha_j\| \qquad k = \max_j \\|e_j\\|_0.
$$

Hence $a\\|x\\|_0 \le \\|x\\|,$ where $ a=\frac{c}{k}>0.$
Interchange of the roles of $\\|\cdot\\|$ and $\\|\cdot\\|_0$, we also have
$
\\|x\\|\le b\\|x\\|_0,
$
so these norms are equivalent. 

---

## 4. Compactness and Finite Dimension

### 4.1 Definition (Compactness)

A metric space $X$ is said to be compact if every sequence in $X$ has a convergent subsequence. A subset $M$ of $X$ is said to be compact if $M$ is compact considered as a subspace of $X$, that is, if every sequence in $M$ has a convergent subsequence whose limit is an element of $M$.

### 4.2 Lemma (Compactness)

A compact subset $M$ of a metric space is closed and bounded.

### 4.3 Theorem (Compactness)

In a finite dimensional normed space $X$, any subset $M \subset X$ is compact if and only if $M$ is closed and bounded.

### 4.4 F. Riesz's Lemma

Let $Y$ and $Z$ be subspaces of a normed space $X$ (of any dimension), and suppose that $Y$ is closed and is a proper subset of $Z$. Then for every real number $\theta$ in the interval $(0,1)$ there is a $z \in Z$ such that

$$
\\|z\\| = 1, \qquad \\|z - y\\| \ge \theta \quad \text{for all } y \in Y.
$$

*Proof.*

We consider any $v \in Z \setminus Y$ and denote its distance from $Y$ by $a$, that is,

$$
a = \inf_{y \in Y} \|v - y\|.
$$

Clearly, $a > 0$ since $Y$ is closed. We now take any $\theta \in (0,1)$. By the definition of an infimum there is a $y_0 \in Y$ such that

$$
a \le \|v - y_0\| \le \frac{a}{\theta}.
$$

Let
$
z = c(v - y_0), \text{ where } c = \frac{1}{\|v - y_0\|}, 
$
then $\\|z\\| = 1$, and we show that $\\|z - y\\| \ge \theta$ for every $y \in Y$. We have

\begin{align*}
\\|z - y\\| &= \|c(v - y_0) - y\| \\\\
&= c \\|v - y_0 - c^{-1} y\\| \\\\
&= c \\| v - y_1 \\| \qquad (y_1 = y_0 + c^{-1} y)
\end{align*}

The form of $y_1$ show that $y_1 \in Y$. Hence $\\|v - y_1\\| \ge a$ and we obtain
$$
\\|z - y\\| = c \\|v - y_1\\| \ge ca = \frac{a}{\|v - y_0\|} \ge \frac{a}{a/\theta} = \theta.
$$

### 4.5 Theorem (Finite dimension)

If a normed space $X$ has the property that the closed unit ball $M = \\{x \mid \\|x\\| \le 1\\}$ is compact, then $X$ is finite dimensional.

### 4.6 Theorem (Continuous mapping)

Let $X$ and $Y$ be metric spaces and $T : X \to Y$ a continuous mapping. Then the image of a compact subset $M$ of $X$ under $T$ is compact.

### 4.7 Corollary (Maximum and Minimum)

A continuous mapping $T$ of a compact subset $M$ of a metric space $X$ into $\mathbb{R}$ assumes a maximum and minimum at some points of $M$.

--- 

## 5. Linear operators

### 5.1 Definition (Linear operator)

A linear operator $T$ is an operator such that

$\text{(i)} \quad$ The domain $\mathcal{D}(T)$ of $T$ is a vector space and the range $\mathcal{R}(T)$ lies in a vector space over the same field.

$\text{(ii)} \quad$ For all $x,y \in \mathcal{D}(T)$ and scalars $\alpha$,
$$
T(x+y) = Tx + Ty
$$
$$
T(\alpha x) = \alpha Tx
$$

**Note.** $\mathcal{N}(T)$ denotes the null space of $T$, the set of all $x \in \mathcal{D}(T)$ such that $Tx = 0$ (Kernel).

$T$ is a homomorphism of a vector space (its domain) into another space, that is $T$ preserves the two operations of vector space.

### Example

**1. Identity operator.** The identity operator $I_X : X \to X$ is defined by $I_X x = x$ for all $x \in X$. Write simply $I$ for $I_X$, thus $Ix = x$.

**2. Differentiation.** Let $X$ be the vector space of all polynomials on $[a,b]$. We may define a linear operator $T$ on $X$ by setting
$$
T x(t) = x'(t)
$$
for every $x \in X$.

**3. Integration.** A linear operator $T$ from $C[a,b]$ into itself can be defined by
$$
T x(t) = \int_a^t x(\tau)\ \mathrm{d}\tau
$$

**4. Multiplication by $t$.** Another linear operator from $C[a,b]$ into itself is defined by
$$
T x(t) = t x(t)
$$

**5. Elementary vector algebra.** Cross product with one factor kept fixed defines a linear operator $T_1 : \mathbb{R}^3 \to \mathbb{R}^3$. Similarly, the dot product with one fixed factor defines a linear operator $T_2 : \mathbb{R}^3 \to \mathbb{R}$, say
$$
T_2 x = x \cdot a = \xi_1 \alpha_1 + \xi_2 \alpha_2 + \xi_3 \alpha_3
$$
where $\alpha = (\alpha_j) \in \mathbb{R}^3$ is fixed.

**6. Matrices.** A real matrix $A = (\alpha_{jk})$ with $r$ rows and $n$ columns defines an operator $T : \mathbb{R}^n \to \mathbb{R}^r$ by means of
$$
y = Ax
$$
where $x = (x_j)$ has $n$ components and $y = (y_j)$ has $r$ components:

$$
\begin{bmatrix}
y_1 \\\\
y_2 \\\\
\vdots \\\\
y_r
\end{bmatrix} = 
\begin{bmatrix}
\alpha_{11} & \alpha_{12} & \cdots & \alpha_{1n} \\\\
\alpha_{21} & \alpha_{22} & \cdots & \alpha_{2n} \\\\
\vdots & \vdots & \ddots & \vdots \\\\
\alpha_{r1} & \alpha_{r2} & \cdots & \alpha_{rn}
\end{bmatrix}
\begin{bmatrix}
x_1 \\\\
x_2 \\\\
\vdots \\\\
x_n 
\end{bmatrix}
$$

### 5.2 Theorem (Range and null space)

Let $T$ be a linear operator, then

$\text{(a)} \quad$ The range $\mathcal{R}(T)$ is a vector space.

$\text{(b)} \quad$ If $\dim \mathcal{D}(T) = n < \infty$, then $\dim \mathcal{R}(T) \le n$.

$\text{(c)} \quad$ The null space $\mathcal{N}(T)$ is a vector space.

**Inverse of linear operator.** $T : \mathcal{D}(T) \to Y$ is injective or one-to-one, there exists the mapping 

\begin{align}
T^{-1} : & \mathcal{R}(T) \to \mathcal{D}(T), \\\\
& \quad y_0 \text{ }\text{ } \mapsto \text{ } \text{ } x_0 \quad (y_0 = Tx_0)
\end{align}
We have 
$$
T^{-1}Tx = x, \qquad TT^{-1}y = y
$$

### 5.3 Theorem (Inverse operator)

Let $X, Y$ be vector spaces, both real or complex. Let $T : \mathcal{D}(T) \to Y$ be a linear operator with domain $\mathcal{D}(T) \subset X$ and $\mathcal{R}(T) \subset Y$. Then:

$\text{(a)} \quad$ The inverse $T^{-1} : \mathcal{R}(T) \to \mathcal{D}(T)$ exists if and only if

$$
Tx = 0 \Rightarrow x = 0
$$

$\text{(b)} \quad$ If $T^{-1}$ exists, it is a linear operator.

$\text{(c)} \quad$ If $\dim \mathcal{D}(T) = n < \infty$ and $T^{-1}$ exists, then
$
\dim \mathcal{R}(T) = \dim \mathcal{D}(T)
$

### 5.4 Lemma (Inverse of product)

Let $T : X \to Y$ and $S : Y \to Z$ be bijective linear operators, where $X, Y, Z$ are vector spaces. Then the inverse $(ST)^{-1} : Z \to X$ of the product $ST$ exists, and

$$
(ST)^{-1} = T^{-1} S^{-1}.
$$

--- 

## 6. Bounded and Continuous Linear Operators

### 6.1 Definition (Bounded linear operator)

Let $X$ and $Y$ be normed spaces and $T : \mathcal{D}(T) \to Y$ a linear operator, where $\mathcal{D}(T) \subset X$. The operator $T$ is said to be bounded if there is a real number $c$ such that for all $x \in \mathcal{D}(T)$,

$$
\\|Tx\\| \le c \\|x\\|
$$

$\Rightarrow$ $c$ is at least as big as the supremum of the expression on the left taken over $\mathcal{D}(T) - \\{0\\}$. This supremum is denoted by $\\|T\\|$; thus

$$
\\|T\\| = \sup_{\substack{x \in \mathcal{D}(T) \\\\ x \ne 0}} \frac{\\|Tx\\|}{\\|x\\|}
$$

$\\|T\\|$ is called the norm of the operator $T$. If $\mathcal{D}(T) = \\{0\\}$ we define $\\|T\\| = 0$. Note that, with $c = \\|T\\|$,

$$
\\|Tx\\| \le \\|T\\| \\|x\\|
$$

### 6.2 Lemma (Norm)

Let $T$ be a bounded linear operator. Then, an alternative formula for the norm of $T$ is

$$
\\|T\\| = \sup_{\substack{x \in \mathcal{D}(T) \\\\ \\|x\\| = 1}} \\|Tx\\|
$$

### Example

**1. Identity operator.** The identity operator $I : X \to X$ on a normed space $X \ne \\{0\\}$ is bounded and has norm $\\|I\\| = 1$.

**2. Differentiation operator.** Let $X$ be the normed space of all polynomials on $J = [0,1]$ with norm given $\\|x\\| = \max |x(t)|$, $t \in J$. A differentiation operator $T$ is defined on $X$ by
$$
Tx(t) = x'(t)
$$
This operator is linear but not bounded.

**3. Integral operator.**  Define an integral operator
$
T: C[0,1] \to C[0,1]
$
by
$$
y = Tx, \text{ where} \quad  y(t)=\int_0^1 k(t,\tau)x(\tau) \mathrm{d}\tau.
$$
Here $k$ is a given function, which is called the *kernel* of $T$, and it is assumed to be continuous on the closed square
$
G = J \times J
$
in the $t\tau$-plane, where
$
J=[0,1].
$

This operator is linear, $T$ is bounded.

**4. Matrix.** A real matrix
$
A=(\alpha_{jk})
$
with $r$ rows and $n$ columns defines an operator
$
T:\mathbb{R}^n \to \mathbb{R}^r
$
by means of
$$
y=Ax.
$$
where
$
x=(x_i) \text{ and } y=(y_i); \quad y_i=\sum_{k=1}^n \alpha_{jk}x_k \quad (j=\overline{1,r}).
$ 
$T$ is linear and bounded.

### 6.3 Theorem (Finite dimension)
If a normed space $X$ is finite dimensional, then every linear operator on $X$ is bounded.

*Proof.*
Let $\dim X=n$ and $\\{e_1,\dots,e_n\\}$ be a basis for $X$. We take any
$
x=\sum \xi_i e_i
$
and consider any linear operator $T$ on $X$. Since $T$ is linear,
\begin{align}
\\|Tx\\|=\left\\| \sum \xi_i Te_i \right\\| & \le \sum |\xi_i|\ \\|Te_i\\| \\\\
& \le \max_k \\|Te_k\\| \sum |\xi_i| \\\\
& \le \max_k \\|Te_k\\| \frac{1}{c}\left\\|\sum \xi_i e_i\right\\|
= \delta \\|x\\|.
\end{align} 
where
$
\delta=\frac{1}{c}\max\limits_k \\|Te_k\\|.
$

### 6.4 Theorem (Continuity and boundedness)
Let
$
T:\mathcal{D}(T)\to Y
$
be a linear operator, where $\mathcal{D}(T)\subset X$ and $X,Y$ are normed spaces. Then:

$\text{(a)} \quad$ $T$ is continuous if and only if $T$ is bounded.

$\text{(b)} \quad$ If $T$ is continuous at a single point, it is continuous.

### 6.5 Corollary (Continuity, null space)
Let $T$ be a bounded linear operator. Then:

$\text{(a)} \quad$ $x_n\to x$ $( \text{where } x_n,x\in \mathcal{D}(T))$ implies $Tx_n\to Tx$.

$\text{(b)} \quad$ The null space $\mathcal{N}(T)$ is closed.

### 6.6 Theorem (Bounded linear extension)
Let
$
T:\mathcal{D}(T)\to Y
$
be a bounded linear operator, where $\mathcal{D}(T)$ lies in a normed space $X$ and $Y$ is a Banach space. Then $T$ has an extension
$$
\tilde T:\overline{\mathcal{D}(T)}\to Y.
$$
where $\tilde T$ is a bounded linear operator with
$$
\\|\tilde T\\|=\\|T\\|.
$$

---

## 7. Linear Functionals

### 7.1 Definition (Linear functional)
A linear functional $f$ is a linear operator with domain in a vector space $X$ and range in the scalar field $K$ of $X$, thus
$$
f:\mathcal{D}(f)\to K.
$$
where $K=\mathbb{R}$ if $X$ is real and $K=\mathbb{C}$ if $X$ is complex.

### 7.2 Definition (Bounded linear functional)
A bounded linear functional $f$ is a bounded linear operator with range in the scalar field of the normed space $X$ in which the domain $\mathcal{D}(f)$ lies. Thus there exists a real number $c$ such that for all
$x\in\mathcal{D}(f)$,
$$
|f(x)|\le c\\|x\\|.
$$
Furthermore, the norm of $f$ is
$$
\\|f\\|=\sup_{\substack{x\in\mathcal{D}(f)\\\\ x\ne 0}}\frac{|f(x)|}{\\
|x\\|}
$$
or
$$
\\|f\\|=\sup_{\substack{x\in\mathcal{D}(f)\\\\ \\|x\\|=1}}|f(x)|.
$$
$$
\Rightarrow |f(x)|\le \\|f\\|\\|x\\|.
$$

### 7.3 Theorem (Continuity and boundedness)
A linear functional $f$ with domain $\mathcal{D}(f)$ in a normed space is continuous if and only if $f$ is bounded.

### Examples

**1. Norm.** The norm $\\|\cdot\\|:X\to\mathbb{R}$ on a normed space $(X,\\|\cdot\\|)$ is a functional on $X$ which is not linear.

**2. Dot product.** The dot product with one factor kept fixed defines a functional
$
f:\mathbb{R}^3\to\mathbb{R}
$
$$
f(x)=x\cdot a=\xi_1 \alpha_1+\xi_2 \alpha_2+\xi_3 \alpha_3.
$$
where $\alpha=(\alpha_j)\in\mathbb{R}^3$ is fixed.  
$f$ is linear, bounded. In fact,
$$
|f(x)|=|x\cdot a|\le \\|x\\|\\|a\\|
\Rightarrow \\|f\\|=\\|a\\|.
$$

**3. Definite integral.** Consider integral for all functions in a certain function space, $f$ is defined by
$$
f(x)=\int_a^b x(t)\ \mathrm{d}t, \qquad x\in C[a,b].
$$
$f$ is linear, bounded and has norm
$
\\|f\\|=b-a.
$

**4. Space $C[a,b]$.** Choose a fixed $t_0\in J=[a,b]$ and set
$$
f_t(x)=x(t_0), \qquad x\in C[a,b].
$$
$f_t$ is linear, $f_t$ is bounded and has norm
$
\\|f_t\\|=1.
$

**5. Space $\ell^2$.** We can obtain a linear functional $f$ on the Hilbert space $\ell^2$ by choosing a fixed
$
a=(a_j)\in \ell^2
$
and setting
$$
f(x)=\sum_{j=1}^{\infty}\xi_j a_j,
$$
where
$
x=(\xi_j)\in \ell^2.
$
This series converges absolutely and $f$ is bounded.

-- The set of all linear functionals defined on a vector space $X$ can itself be made into a vector space. This space is denoted by $X^*$ and is called the **algebraic dual space** of $X$.
+ The sum $f_1+f_2$ of two functionals $f_1$ and $f_2$ is the functional $s$ whose value at every $x\in X$ is
$$
s(x)=(f_1+f_2)(x)=f_1(x)+f_2(x).
$$
+ The product of a scalar $\alpha$ and a functional $f$ is the functional $p$ whose value at $x\in X$ is
$$
p(x)=(\alpha f)(x)=\alpha f(x).
$$

-- Consider the algebraic dual $(X^{\*})^{\*}$ of $X^\*$, whose elements are the linear functionals defined on $X^\*$. Denote $(X^\*)^\*$ by $X^{\* \*}$ and call it the **second algebraic dual space** of $X$.
+ We can obtain a $g\in X^{\*\*}$ which is a linear functional defined on $X^\*$ by choosing a fixed $x\in X$ and setting
$$
g(f)=g_x(f)=f(x) \qquad (x\in X \text{ fixed}\, f\in X^* \text{ variable}).
$$

-- To each $x\in X$ there corresponds a $g_x\in X^{\*\*}$. This defines a mapping
\begin{align}
C:\quad  & X \to X^{**} \\\\
& x \text{ } \mapsto g_x.
\end{align} 

$C$ is called the **canonical mapping** of $X$ into $X^{\*\*}$.

**Isomorphism**. A bijective mapping of $X$ onto $\tilde X$ which preserves the structure.

Accordingly, an isomorphism $T$ of a metric space $X=(X,d)$ onto a metric space $\tilde X=(\tilde X,\tilde d)$ is a bijective mapping which preserves distance, that is, for all $x,y\in X$,
$$
\tilde d(Tx,Ty)=d(x,y).
$$

$\tilde X$ is then called *isomorphic* with $X$. $T: X\to \tilde X$ is a bijective linear operator,
$$
T(x+y)=Tx+Ty, \qquad T(\alpha x)=\alpha Tx.
$$

$X$ and $\tilde X$ are called isomorphic vector spaces.

-- Canonical mapping $C$ is injective. Since $C$ is linear, it is an isomorphism of $X$ onto the range $\mathcal{R}(C)\subset X^{\*\*}$.

+ If $X$ is isomorphic with a subspace of a vector space $Y$, we say that $X$ is *embeddable* in $Y$. $X$ is embeddable in $X^{\*\*}$ and $C$ is also called the *canonical embedding* of $X$ into $X^{\*\*}$.

+ If $C$ is surjective, so that $\mathcal{R}(C)=X^{**}$, then $X$ is said to be *algebraically reflexive*.

---

## 8. Linear Operators and Functionals on Finite Dimensional Spaces

-- Let $X$ and $Y$ be finite dimensional vector spaces over the same field and $T:X\to Y$ a linear operator. We choose a basis
$
E=\\{e_1,\dots,e_n\\} \text{ for } X
$
and a basis
$
B=\\{b_1,\dots,b_m\\} \text{ for } Y,
$
with the vectors arranged in a definite order which we keep fixed. Then every $x\in X$ has a unique representation
$$
x=\xi_1 e_1 + \cdots + \xi_n e_n.
$$

Since $T$ is linear, $x$ has the image
$$
y = Tx = T\left(\sum_{k=1}^n \xi_k e_k\right) = \sum_{k=1}^n \xi_k T e_k.
$$

$y$ and $y_k = T e_k$ are in $Y$; they have unique representations of the form
$$
y = \sum_{j=1}^r \eta_j b_j,
$$
$$
T e_k = \sum_{j=1}^r \tau_{jk} b_j.
$$

Then
$$
y = \sum_{j=1}^r \eta_j b_j 
= \sum_{k=1}^n \xi_k T e_k
= \sum_{k=1}^n \xi_k \sum_{j=1}^r \tau_{jk} b_j
= \sum_{j=1}^r \left(\sum_{k=1}^n \tau_{jk} \xi_k \right) b_j.
$$

$$
\Rightarrow \eta_j = \sum_{k=1}^n \tau_{jk} \xi_k, \qquad j=1,\dots,r.
$$

The coefficients form a matrix:
$
T_{EB} = (\tau_{jk})
$
with $r$ rows and $n$ columns. The matrix $T_{EB}$ represents the operator $T$ with respect to bases.

Let $\tilde{x} = (\xi_k)$ and $\tilde{y} = (\eta_j)$. In matrix notation,
$$
\tilde{y} = T_{EB}\tilde{x},
$$
$$
T e = T_{EB} b.
$$

-- For every functional $f$ and every $x=\sum\limits_{j=1}^n \xi_j e_j \in X$, we have
$$
f(x)=f\left(\sum_{j=1}^n \xi_j e_j\right)
= \sum_{j=1}^n \xi_j f(e_j)
= \sum_{j=1}^n \xi_j \alpha_j,
$$
where $\alpha_j = f(e_j)$, and $f$ is uniquely determined by its values $\alpha_j$ at the $n$ basis vectors of $X$. Conversely, every $n$-tuple of scalars $\alpha_1,\dots,\alpha_n$ determines a linear functional on $X$.
Take $n$-tuples
$$
(1,0,0,\dots,0), \quad (0,1,0,\dots,0), \quad \dots, \quad (0,0,0,\dots,1).
$$

This gives $n$ functionals, denote $f_1,\dots,f_n$, with values
<span class="sidenote" id="note1">
    1. Kronecker delta 
</span>
$$
f_j(e_k)=\delta_{jk}^{\hspace{0.2cm} \color{gray}{1}}=
\begin{cases}
0 & \text{if } j\ne k,\\\\
1 & \text{if } j=k,
\end{cases}
$$

$\\{f_1,\dots,f_n\\}$ is called the **dual basis** of the basis $\\{e_1,\dots,e_n\\}$ of $X$.

### 8.1 Theorem (Dimension of $X^*$)
Let $X$ be an $n$-dimensional vector space and $E=\\{e_1,\dots,e_n\\}$ a basis for $X$. Then
$
F=\\{f_1,\dots,f_n\\}
$
is a basis for the algebraic dual $X^\*$ of $X$, and
$
\dim X^\* = \dim X = n.
$

### 8.2 Lemma (Zero vector)
Let $X$ be a finite dimensional vector space. If $x_0 \in X$ has the property that
$
f(x_0)=0
$
for all $f\in X^\*$, then $x_0=0$.

### 8.3 Theorem (Algebraic reflexivity)
A finite dimensional vector space is algebraically reflexive.

---

## 9. Normed Spaces of Operators. Dual Space. 
-- Take any two normed spaces $X$ and $Y$ (both real or complex) and consider the set $B(X,Y)$ consisting of all bounded linear operators from $X$ onto $Y$. $B(X,Y)$ can itself be made into a normed space.

+ Define $T_1+T_2$ of two operators $T_1,T_2\in B(X,Y)$ by
$$
(T_1+T_2)x = T_1x + T_2x.
$$

+ Define the product $\alpha T$ of $T\in B(X,Y)$ and a scalar $\alpha$ by
$$
(\alpha T)x = \alpha Tx.
$$

Then $B(X,Y)$ becomes a vector space so itself a normed space with norm defined by
$$
\\|T\\| = \sup_{\substack{x\in X \\\\ x\ne 0}} \frac{\\|Tx\\|}{\\|x\\|}
= \sup_{\\|x\\|=1} \\|Tx\\|.
$$

### 9.1 Theorem (Completeness)
If $Y$ is a Banach space, then $B(X,Y)$ is a Banach space.

*Proof.*

Consider an arbitrary Cauchy sequence $(T_n)$ in $B(X,Y)$ and show that $(T_n)$ converges to an operator $T\in B(X,Y)$.

Since $(T_n)$ is Cauchy, for every $\varepsilon>0$ there is an $N$ such that
$$
\\|T_n - T_m\\| < \varepsilon \quad (m,n > N).
$$

For all $x\in X$ and $m,n>N$ we obtain
\begin{equation}
\\|T_n x - T_m x\\| = \\|(T_n - T_m)x\\| \le \\|T_n - T_m\\|\\|x\\| < \varepsilon \\|x\\| \tag{1}.
\end{equation}

$\Rightarrow$ for fixed $x$, $(T_n x)$ is Cauchy in $Y$. Since $Y$ is complete, $(T_n x)$ converges, say
$$
T_n x \to y.
$$
The limit $y\in Y$ depends on the choice of $x\in X$. Define an operator
$$
T: X \to Y, \quad \text{where } y=Tx.
$$

The operator $T$ is linear:
$$
\lim T_n(\alpha x_1 + \beta x_2)
= \lim (\alpha T_n x_1 + \beta T_n x_2)
= \alpha \lim T_n x_1 + \beta \lim T_n x_2.
$$

We prove that $T$ is bounded and $T_n \to T$, that is, $\\|T_n - T\\|\to 0$. Since (1) holds for every $m>N$ and $T_m x \to Tx$, let $m\to\infty$. Using the continuity of the norm, for every $n>N$ and all $x\in X$,
\begin{equation}
\\|T_n x - Tx\\|
= \\|T_n x - \lim_{m\to\infty} T_m x\\|
= \lim_{m\to\infty} \\|T_n x - T_m x\\|
\le \varepsilon \\|x\\|. \tag{2} 
\end{equation}

$\Rightarrow (T_n - T)$ with $n>N$ is a bounded linear operator. Since $T_n$ is bounded, $T = T_n - (T_n - T)$ is bounded, hence $T\in B(X,Y)$. In (2), take the supremum over all $x$ of norm $1$, we obtain
$$
\\|T_n - T\\| \le \varepsilon \quad (n>N).
$$

Hence, $\\|T_n - T\\|\to 0$.

### 9.2 Definition (Dual space $X'$)

Let $X$ be a normed space. Then the set of all bounded linear functionals on $X$ constitutes a normed space with norm defined by

$$
\\|f\\|=\sup_{\substack{x\in X \\\\ x\neq 0}}\frac{|f(x)|}{\\|x\\|}=\sup_{\\|x\\|=1}|f(x)|.
$$

which is called the dual space of $X$ and is denoted by $X'$.

### 9.3 Theorem (Dual Space)
The dual space $X'$ of a normed space $X$ is a Banach space.

An isomorphism of a normed space $X$ onto a normed space $\tilde X$ is a bijective linear operator $T:X\to \tilde X$ which preserves the norm, that is, for all $x\in X$,
$
\\|Tx\\|=\\|x\\|.
$
($T$ is isometric)
+ $X$ is called isomorphic with $\tilde X$.
+ $X$ and $\tilde X$ are called isomorphic normed space.

### Example

**1. Space $\mathbb{R}^n$.** The dual space of $\mathbb{R}^n$ is $\mathbb{R}^n$.

*Proof.*

We have $(\mathbb{R}^{n})^{\'}=(\mathbb{R}^{n})^\*$ and every $f\in (\mathbb{R}^{n})^\*$ has a representation

$$
f(x)=\sum \xi_k \gamma_k,\qquad \gamma_k=f(e_k).
$$

By Cauchy--Schwarz inequality,
$$
|f(x)|\le \sum |\xi_k \gamma_k|
\le \left(\sum \xi_j^2\right)^{1/2}\left(\sum \gamma_k^2\right)^{1/2}
=\\|x\\|\left(\sum \gamma_k^2\right)^{1/2}.
$$
Taking the supremum over all $x$ of norm $1$, we obtain
$$
\\|f\\|\le \left(\sum \gamma_k^2\right)^{1/2}.
$$
However, since for $x=(x_1,\ldots,x_n)\to$ equality is achieved, we must have

$$
\\|f\\|=\left(\sum_{k=1}^n \gamma_k^2\right)^{1/2}.
$$

This proves that norm of $f$ is the Euclidean norm, $\\|f\\|=\\|c\\|$ where $c=(\gamma_k)\in \mathbb{R}^n$.

Hence the mapping of $(\mathbb{R}^{n})^{'}$ onto $\mathbb{R}^n$ defined by $f\mapsto c=(\gamma_k)$, $\gamma_k=f(e_k)$, is norm preserving, it is linear and bijective, it is an isomorphism.

**2. Space $\ell^1$.** The dual space of $\ell^1$ is $\ell^\infty$.

**3. Space $\ell^p$.** The dual space of $\ell^p$ is $\ell^q$; here, $1 < p < +\infty$ and $q$ is the conjugate of $p$, that is, $1/p + 1/q = 1.$

## References

[1] Kreyszig, E. (1978). *Introductory functional analysis with applications*. John Wiley & Sons.