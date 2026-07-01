---
title: Metric space
date: 2025-10-05
update: 2026-01-18
categories:
  - writings
tags:
  - functional analysis 
  - metric space
---

<script>
window.MathJax = {
    loader: {load: ['[tex]/ams']},
    tex: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        packages: {'[+]': ['ams']}
    },
    svg: {fontCache: 'global'},
    useLabelIds: true
};
</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
<!--more-->
<style>
mjx-container[jax="SVG"][display="true"] {
  display: block;
  text-align: center;
  margin: 1em auto;
}
</style>

## 1. Definition
-- A metric space is a pair $(X, d)$, where $X$ is a set and $d$ is a metric on $X$ (or distance function on $X$), that is a function defined on $X \times X$ such that for all $x, y, z \in X$, we have
1) $d$ is real - valued, finite and non negative
2) $d(x, y)=0 \Leftrightarrow x=y$
3) $d(x, y)=d(y, x)$
4) $d(x, y) \leq d(x, z)+d(z, y) \rightarrow d\left(x, x_{n}\right) \leq \sum_{i=1}^{n-1} d\left(x_{i}, x_{i+1}\right)$

-- A subspace $(Y, \tilde{d})$ of $(X, d)$ is obtained if we take a subset $Y_{C} \subset X$ and restrict $d$ to $Y \times Y$; thus the metric on $Y$ is the restriction
$$
\tilde{d}= d\|_{Y \times Y}
$$
$\tilde{d}$ is called the metric induced on $y$ by $d$

### Example 

**1. Euclidean space $\mathbb{R}^{n}$, unitary space $\mathbb{C}^{n}$, complex plan $\mathbb{C}.$**

Take the set of all ordered $n$-tuples of real numbers, written
$$
x=\left(x_{1}, x_{2}, \ldots, x_{n}\right), \quad y=\left(y_{1}, y_{2}, \ldots, y_{n}\right)
$$
and the Euclidean metric defined by
$$
d(x, y)=\sqrt{\left(x_{1}-y_{1}\right)^{2}+\left(x_{2}-y_{2}\right)^{2}+\ldots+\left(x_{n}-y_{n}\right)^{2}}
$$
$n$ - dimensional unitary space $\mathbb{C}^{n}$ has the metric defined by
$$
d(x, y)=\sqrt{\left|x_{1}-y_{1}\right|^{2}+\left|x_{2}-y_{2}\right|^{2}+\ldots+\left|x_{n}-y_{n}\right|^{2}}
$$

**2. Sequence space $l^{\infty}$.**

Take the set of all bounded sequences of complex numbers; every element of $X$ is a complex sequence
$$
x=\left(x_{1}, x_{2}, \ldots, x_{n}\right) \text { briefly } x=\left(x_{i}\right)
$$
such that for all $j \in \mathbb{N}^{*}$, we have

$$
\left|x_{j}\right| \leqslant c_{x}
$$
$c_{x}$ is a real number which may depend on $x$, not on $j$. Metric is defined by
$$
d(x, y)=\sup_{j \in \mathbb{N}^{*}}|x_{j}-y_{j}|
$$
where $y=\left(y_{j}\right) \in X$.

**3. Function space $C[a, b]$.**

Take the set of all real-valued function $x, y, \ldots$ and are defined and continuous on a given closed interval $J=[a, b]$ The metric defined by
$$
d(x, y)=\max _{t \in J}|x(t)-y(t)|
$$

**4. Sequence spaces.**

The space consists of the set of all (bounded or unbounded) sequences of complex numbers and the metric $d$ defined by
where $x=\left(x_{j}\right), y=\left(y_{j}\right)$
$$
d(x, y)=\sum_{j=1}^{\infty} \frac{1}{2^{j}} \frac{\left|x_{j}-y_{j}\right|}{1+\left|x_{j}-y_{j}\right|}
$$

*Proof.*

$f(t)=\frac{t}{1+t}$ is monotone increasing; $|a+b| \leqslant|a|+|b|$ implies $f(|a+b|) \leqslant f(|a|+|b|).$
Then we have:
$$
\frac{|a+b|}{1+|a+b|} \leqslant \frac{|a|+|b|}{1+|a|+|b|} \leqslant \frac{|a|}{1+|a|}+\frac{|b|}{1+|b|}
$$

Let $a=x_{j}-z_{j}$ and $y=z_{j}-y_{j}$ where $z=\left(z_{j}\right)$. Therefore $a+b=x_{j}-y_{j}$ and
$$
\frac{\left|x_{j}-y_{j}\right|}{1+\left|x_{j}-y_{j}\right|} \leqslant \frac{\left|x_{j}-z_{j}\right|}{1+\left|x_{j}-z_{j}\right|}+\frac{\left|z_{j}-y_{j}\right|}{1+\left|z_{j}-y_{j}\right|}
$$
Then 
$$ \sum_{j=1}^{\infty} \frac{1}{2^{j}} \frac{\left|x_{j}-y_{j}\right|}{1+\left|x_{j}-y_{j}\right|} \leqslant \sum_{j=1}^{\infty} \frac{1}{2^{j}} \frac{\left|x_{j}-z_{j}\right|}{1+\left|x_{j}-z_{j}\right|}+\sum_{j=1}^{\infty} \frac{1}{2^{j}} \frac{\left|z_{j}-y_{j}\right|}{1+\left|z_{j}-y_{j}\right|}$$
or $$d(x, y) \leq d(x, z)+d(z, y).$$

**5. Space $B(A)$ of bounded function.**

Each element $x \in B(A)$ is a function defined and bounded on a given set $A$, the metric is defined:
$$
d(x, y)=\sup _{t \in A}|x(t)-y(t)|
$$

**6. Space $l^{p}$, Hillbert sequence space $l^{2}$, Holder and Minkowski inequalities for sums.**

Each element in the space $\ell^{p}$ is a sequence $x=\left(x_{i}\right)=\left(x_{1}, x_{2}, \ldots\right)$ of numbers such that
$$
\sum_{j=1}^{\infty}\left|x_{i}\right|^{p}<\infty \quad(p \geqslant 1) \\
$$
and the metric is defined by
$$
d(x, y)=\left(\sum_{j=1}^{\infty}\left|x_{j}-y_{j}\right|^{p}\right)^{\frac{1}{p}}
$$
*Proof.*

$l^{p}$ is a metric space

$\text{(a)} \quad$ Auxiliary in equality
$\frac{1}{p}+\frac{1}{q}=1$ ($p, q$ are called conjugate exponents). Then
$$
\alpha \beta \leqslant \frac{\alpha^{p}}{p}+\frac{\beta^{q}}{q}
$$

$\text{(b)} \quad$ Holder inequality
$$
\sum_{j=1}^{\infty}\left|x_{j} y_{j}\right| \leqslant\left(\sum_{j=1}^{\infty}\left|x_{j}\right|^{p}\right)^{\frac{1}{p}}\left(\sum_{j=1}^{\infty}\left|y_{j}\right|^{q}\right)^{\frac{1}{q}}
$$

Let $ \left(\tilde{x_{i}}\right)$ and $\left(\tilde{y_{j}}\right) $ such that

$$
\begin{equation}
\sum\left|\tilde{x_{i}}\right|^{p} = 1, \quad \sum\left|\tilde{y_{j}}\right|^{q}=1 \tag{1}
\end{equation}
$$

Set $\alpha=\left|x_{j}\right|$ and $\beta=\left|y_{j}\right|$, we have
$$
\begin{equation}
\left|\tilde{x_{j}} \tilde{y_{j}}\right| \leqslant \frac{1}{p}\left|\tilde{x_{j}}\right|^{p}+\frac{1}{q}\left|\tilde{y_{j}}\right|^{q} \tag{2}
\end{equation}
$$

Then
$$
\begin{equation}
\sum\left|\tilde{x_{j}}\tilde{y_{j}}\right| \leqslant \frac{1}{p}+\frac{1}{q}=1. \tag{3}
\end{equation}
$$

Now, take $x=\left(x_{j}\right) \in l^{p}$ and $y=\left(y_{j}\right) \in l^{p}$ and set
$$
\tilde{x_{j}}=\dfrac{x_{j}}{\left(\sum\left|x_{k}\right|^{p}\right)^{\frac{1}{p}}}; \quad \tilde{y_{j}}=\dfrac{y_{j}}{\left(\sum\left|y_{j}\right|^{q}\right)^{\frac{1}{q}}}
$$

Then (1) sastified, so we apply (2) and (3) to have
$$
\sum_{j=1}^{\infty}\left|x_{j} y_{j}\right| \leqslant\left(\sum_{k=1}^{\infty}\left|x_{k}\right|^{p}\right)^{\frac{1}{p}}\left(\sum_{m=1}^{\infty}\left|y_{m}\right|^{q}\right)^{\frac{1}{q}}
$$

$\text{(c)} \quad$ Minkowski inequality
$$
\begin{equation}
\left(\sum_{j=1}^{\infty}\left|x_{j}+y_{j}\right|^{p}\right)^{\frac{1}{p}} \leqslant\left(\sum_{k=1}^{\infty}\left|x_{k}\right|^{p}\right)^{\frac{1}{p}}+\left(\sum_{m=1}^{\infty}\left|y_{m}\right|^{p}\right)^{\frac{1}{p}} \tag{4}
\end{equation}
$$
where $x=\left(x_{j}\right) \in l^{p}$ and $y=\left(y_{j}\right) \in l^{p}$.

Write $x_{j}+y_{j}=\omega_{j}$, then
$$
\begin{aligned}
\left|w_{j}\right|^{p} & =\left|x_{j}+y_{j}\right|\left|w_{j}\right|^{p-1} \\\
& \leqslant \left( \left|x_{j}\right|+\left|y_{j}\right| \right) \left|w_{j}\right|^{p-1}
\end{aligned}
$$

Summing over $j$ from 1 to any fixed $n$, we obtain
$$
\begin{align}
\sum\left|w_{j}\right|^{p} &\leqslant \sum\left|x_{j}\right|\left|w_{j}\right|^{p-1}+\sum\left|y_{j}\right|\left|w_{j}\right|^{p-1} \\\
&\leqslant \left(\sum\left|x_{k}\right|^{p}\right)^{\frac{1}{p}}\left(\sum\left|w_{m}\right|^{(p-1)q}\right)^{\frac{1}{q}}+\left(\sum\left|w_{k}\right|^{p}\right)^{\frac{1}{p}}\left(\sum\left|w_{m}\right|^{(p-1) q}\right)^{\frac{1}{q}} \\\
&= \left\\{\left(\sum\left|x_{k}\right|^{p}\right)^{\frac{1}{p}}+\left(\sum\left|y_{k}\right|^{p}\right)^{\frac{1}{p}}\right\\}\left(\sum\left|w_{m}\right|^{p}\right)^{\frac{1}{q}} \quad ((p-1) q=p)
\end{align}
$$

Dividing by the last factor and noting that $1-\frac{1}{q}=\frac{1}{p}$, we obtain (4).

$\text{(d)} \quad$ From $\text{(c)}$
$$
\begin{align}
d(x, y) & =\left(\sum\left|x_{j}-y_{j}\right|^{p}\right)^{\frac{1}{p}} \\\
& \leqslant\left(\sum\left(\left|x_{j}-z_{j}\right|+\left|z_{j}-y_{j}\right|^{p}\right)^{\frac{1}{p}}\right. \\\
& \leqslant\left(\sum\left|x_{j}-z_{j}\right|^{p}\right)^{\frac{1}{p}}+\left(\sum\left|z_{j}-y_{j}\right|^{p}\right)^{\frac{1}{p}} \\\
& =d(x, z)+d(z, y)
\end{align}
$$

### Diameter, bounded set 
The diameter $\delta(A)$ of a nonempty set $A$ in a metric space $(X, d)$ is defined to be
$$
\delta(A)=\sup _{x, y \in A} d(x, y) .
$$
$A$ is said to be bounded if $\delta(A)<\infty$

### Distance between sets
The distance $D(A, B)$ between two nonempty subsets $A$ and $B$ of a metric space $(x, d)$ is defined to be
$$
D(A, B)=\inf _{\substack{a \in A, \\\ b \in B}} d(a, b) .
$$
$D$ does not define a metric on the power set of $X$

### Product of metric space

The Cartesian product $X=X_{1} \times X_{2}$ of two metric spaces $\left(X_{1}, d_{1}\right)$ and $\left(X_{2}, d_{2}\right)$ can be made into a metric space $(X, d)$.

### Example
**1.** $d(x, y)=d_{1}\left(x_{1}, y_{1}\right)+d_{2}\left(x_{2}, y_{2}\right)$

**2.** $\tilde{d}(x, y)=\sqrt{d_{1}\left(x_{1}, y_{1}\right)^{2}+d_{2}\left(x_{2}, y_{2}\right)^{2}}$

**3.** $\tilde{d}(x, y)=\max \left[d_{1}\left(x_{1}, y_{1}\right), d_{2}\left(x_{2}, y_{2}\right)\right]$ 

---

## 2. Open Set, Closed Set, Neighborhood

### 2.1 Definition (Ball and sphere)

Given a point $x_{0} \in X$ and a real number $r>0$, we define three types of sets

$\text{(a)} \quad$ $B\left(x_{0}, r\right)=\left\\{x \in X \mid d\left(x, x_{0}\right)<r\right\\} \quad$ (Open ball)

$\text{(b)} \quad$ $\tilde{B}\left(x_{0}, r\right)=\left\\{x \in X \mid d\left(x, x_{0}\right) \leq r\right\\} 
\quad$ (Closed ball)

$\text{(c)} \quad$ $S\left(x_{0}, r\right)=\left\\{x \in X \mid d\left(x, x_{0}\right)=r\right\\} \quad$ (Sphere)

$x_{0}$ : center; $r$ : radius. 
$S\left(x_{0}, r\right)=\tilde{B}\left(x_{0}, r\right)-B\left(x_{0}, r\right)$.

### 2.2 Definition (Open set, Closed set).
A subset $M$ of a metric space $X$ is said to be open if it contains a ball about each of its points. $A$ subset $K$ of $X$ is said to be closed if its complement (in $X$ ) is open, that is, $K^{c}=X-K$ is open.

-- An open ball $B\left(x_{0}, \varepsilon\right)$ of radius $\varepsilon$ is often called an $\varepsilon$-neighborhood of $x_{0}$

-- Call $x_{0}$ an interior point of a set $M \subset X$ if $M$ is a neighborhood of $x_{0}$.

-- The interior of $M$ is the set of all interior points of $M$, denoted $M^{0}$ or $\operatorname{Int}(M)$.

-- The collection of all open subsets of $X$, call it $\mathcal{J}$, has properties:

- $T_{1}. \emptyset \in \mathcal{J}, x \in \mathcal{J}$

- $T_{2}$. The union of any nembers of $\mathcal{J}$ is a member of $\mathcal{J}$

- $T_{3}$. The intersection of finitely many members of $\mathcal{J}$ is a member of $\mathcal{J}$.

-- Define a topological space $(x, g)$ to be a set $x$ and a collection $\mathcal{J}$ of subsets of $x$ such that $\mathcal{J}$ satisfies $\left(T_{1}\right)$ and $\left(T_{3}\right)$

-- $\mathcal{J}:$ topology for $X$.

### 2.3 Definition (Continuous mapping).
Let $X=(x, d)$ and $Y=(y, \tilde{d})$ be metric spaces. A mapping $T: X \rightarrow Y$ is said to be continuous at a point $x_{0} \in X$ if for every $\varepsilon>0$, there is a $\delta>0$ such that
$$
\tilde{d}\left(T x, T x_{0}\right)<\varepsilon \quad \text { for all } x \text { satisfying } \quad d\left(x, x_{0}\right)<\delta
$$

### 2.4 Theorem (Continuous mapping) 
A mapping $T$ of a metric space $X$ into a metric space $Y$ is continuous if and only if the inverse image of any open subset of $Y$ is an open subset of $X$.

Let $M$ be a subset space $X$. Then a point $x_{0}$ of $X$ is called an accumulation point of $M$ if every neighborhood of $x_{0}$ contains at least one point $y \in M$ distance from $x_{0}$. The set consisting of the points of $M$ and the accumulation points of $M$ is called the closure of $M$ and is denoted by $\bar{M}$.

### 2.5 Definition (Dense set, separable space)
A subset $M$ of a metric space $X$ is said to be dense in $X$ if $\bar{M}=X$.
$X$ is said to be separable if it has countable subset which is dense in $X$

### Example
**1. Real line $\mathbb{R}$.** The real line $\mathbb{R}$ is separable.
-- The set $\mathbb{Q}$ of all rational numbers is countable and is dense in $\mathbb{R}$.

**2. Complex plane $\mathbb{C}$.** The complex plane $\mathbb{C}$ is separable
-- A countable dense subset of $\mathbb{C}$ is the set of all complex numbers whose real and imaginary parts are both rational.

**3 Discrete metric space.** A discre metric space $X$ is separable if and only if $X$ is countable.

**4. Space $l^{\infty}$.** The space $l^{\infty}$ is not separable.

**5. Space $\ell^{p}$.** The space $\ell^{p}$ with $1 \leqslant p<\infty$ is separable

---

## 3. Convergence, Cauchy Sequence, Completeness.

### 3.1 Definition (Convergence of a sequence, limit)
A sequence $\left(x_{n}\right)$ in a metric space $X=(x, d)$ is said to converge or to be convergent if there is an $x \in X$ such that
$$
\lim_{n \rightarrow \infty} d\left(x_{n}, x\right)=0
$$
$x$ is called the limit of $\left(x_{n}\right)$ and we write
$$
\lim_{n \rightarrow \infty} x_{n}=x
$$
or, simply, 
$$
\lim_{n \rightarrow \infty} x_{n} \to x
$$
Hence, if $x_{n} \rightarrow x$, an $\varepsilon>0$ being given, there is an $N=N(\varepsilon)$ such that all $x_{n}$ with $n>N$ lie in the $\varepsilon$ - neighborhood $B(x, \varepsilon)$ of $x$.

### 3.2 Lemma (Boundedness limit) 
Let $(x, d)$ be a metric space. Then: 

$\text{(a)} \quad$ A convergent sequence in $x$ is bounded and its limit is unique.

$\text{(b)} \quad$ If $x_{n} \rightarrow x$ and $y_{n} \rightarrow y$ in $x$, then $d\left(x_{n}, y_{n}\right) \rightarrow d(x, y)$.

### 3.3 Definition (Cauchy sequence, completeness) 
A sequence $\left(x_{n}\right)$ in a metric space $X=(x, d)$ is said to be cauchy if for every $\varepsilon>0$, there is a $N=N(\varepsilon)$ such that
$$
d\left(x_{m}, x_{n}\right)<\varepsilon \quad \forall m, n>N .
$$

The space $X$ is said to be complete if every Cauchy sequence in $X$ converges (has a limit which is an element of $x$).

### 3.4 Theorem (Convergent sequence) 
Every convergent sequence in a metric space is a Cauchy sequence.

### 3.5 Theorem (Closure, closed set) 
Let $M$ be a nonempty subset of metric space ($X, d$) and $\bar{M}$ its closure.

$\text{(a)} \quad$ $x \in \bar{M}$ if and only if there is a sequence $\left(x_{n}\right)$ in $M$ such that $x_{n} \rightarrow x$.

$\text{(b)} \quad$ $M$ is closed if and only if the situation $x_{n} \in M, x_{n} \rightarrow x$ implies that $x \in M$.

### 3.6 Theorem (Complete space) 
A subspace $M$ of a complete metric space $X$ is itself complete if and only if the set $M$ is closed in $X$.

### 3.7 Theorem (Continuous mapping)
A mapping $T: X \rightarrow Y$ of a metric space $(X, d)$ into a metric space $(Y, \tilde{d})$ is continuous at a point $x_{0} \in X$ if and only if $x_{n} \rightarrow x_{0}$ implies $Tx_{n} \rightarrow Tx_{0}$.

### Example 
**1. Completeness of $\mathbb{R}^{n}$ and $\mathbb{C}^{n}$**

-- Consider $\mathbb{R}^{n}$. The metric on $\mathbb{R}^{n}$ is defined by
$$
d(x, y)=\left(\sum_{j=1}^{\infty}\left(x_{j}-y_{j}\right)^{2}\right)^{\frac{1}{2}}
$$
where $x=\left(x_{j}\right)$ and $y=\left(y_{j}\right)$. We consider any Cauchy sequence $\left(x_{m}\right)$ in $\mathbb{R}^{n}$, writing $x_{m}=\left(x_{m, 1}, x_{m, 2}, \ldots\right.$, $\left.x_{m, n}\right)$. Since $\left(x_{m}\right)$ is Cauchy, for every $\varepsilon>0$ there exist an $N$ such that

$$
\begin{equation}
\quad d\left(x_{m}, x_{r}\right)=\left(\sum_{j=1}^{n}\left(x_{m, j}-x_{r, j}\right)^{2}\right)^{\frac{1}{2}}<\varepsilon \quad (m, r > N) \tag{1} 
\end{equation} 
$$

Squaring, we have for $m, r>N$ and $j=1,2, \ldots, n$.
$$
\left(x_{m, j}-x_{r, j}\right)^{2}<\varepsilon \quad \text { and } \quad\left|x_{m, j}-x_{r, j}\right|<\varepsilon
$$

This show that, for each fixed $j(1 \leqslant j \leqslant n)$, the sequence $\left(x_{1, j}, x_{2,j}, \ldots\right)$ is a Cauchy sequence of real numbers. It converges so $x_{m, j} \rightarrow x_{j}$ as $m \rightarrow \infty$. Using these $n$ limits, we define $x=\left(x_{1}, \ldots, x_{n}\right)$.

Clearly, $x \in \mathbb{R}^{n}$. From (1), with $r \rightarrow \infty$,
$$
d\left(x_{m}, x\right)<\varepsilon \quad(m>N)
$$

This show that $x$ is the limit of $\left(x_{m}\right)$.

**2. Completeness of $l^{\infty}$.** The space $l^{\infty}$ is complete.

**3. Completeness of $c$.** The space $c$ consists of all convergent sequence $x=\left(x_{j}\right)$ of complex numbers, with the metric induced from the space $l^{\infty}$. The space $c$ is complete.

**4. Completeness of $l^{p}$.** The space $l^{p}$ is complete.

**5. Completeness of $C[a, b]$.** The function space $C[a, b]$ is complete.

### 3.8 Incomplete metric spaces
**1. Space $\mathbb{Q}$** - set of all rational numbers

**2. Polynomials.** Let $X$ be the set of all polynomials considered as functions on $t$ on some finite closed interval $T=[a, b]$ and define a metric $d$ on $X$ by
$$
d(x, y)=\max_{t \in J}|x(t)-y(t)|
$$

**3. Continuous functions.** Let $x$ be the set of all continuous real-valued function on $J=[0,1]$, and let
$$
d(x, y)=\int_{0}^{1}|x(t)-y(t)| \mathrm{d}t
$$

---

## 4. Completion of Metric Spaces

### 4.1 Definition (Isometric mapping, isometric spaces). 
Let $X=(x, d)$ and $\tilde{X}=(\tilde{X}, \tilde{d})$ be metric spaces. Then

$\text{(a)} \quad$ A mapping $T$ of $X$ into $\tilde{X}$ is said to be isometric or an isometry if $T$ preserves distances, that is if for all $x, y \in X$
$$
\tilde{d}(T x, T y)=d(x, y)
$$
$\text{(b)} \quad$ The space $X$ is said to be isometric with the space $\tilde{X}$ if there exists a bijective isometry of $X$ onto $\tilde{X}.$ The space $X$ and $\tilde{X}$ are then called isometric spaces.

### 4.2 Theorem (Completion) 
For a metric space $X=(X, d)$ there exists a complete metric space $\hat{X}=(\hat{X}, \hat{d})$ which has a subspace $W$ thas is isometric with $X$ and is dense in $\hat{X}$. This space $\hat{X}$ is unique except for isometries, that is, if $\tilde{X}$ is any complete metric space having a dense subspace $\tilde{W}$ isometric with $X$, then $X$ and $\tilde{X}$ are isometric.

## References 

[1] Kreyszig, E. (1978). *Introductory functional analysis with applications*. John Wiley & Sons.