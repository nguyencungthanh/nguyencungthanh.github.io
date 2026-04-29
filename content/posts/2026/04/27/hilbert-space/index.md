---
title: Hilbert Space 
date: 2026-04-27
# update: 2026-04-27
categories:
  - writings
tags:
  - functional analysis 
  - hilbert space
---

<!--more--> 

## 1. Inner Product Spaces, Hilbert Spaces

### 1.1 Definition (Inner product space, Hilbert space)

-- An inner product space is a vector space $X$ with an inner product defined on $X$. A Hilbert space is a complete inner product space. An inner product on $X$ is a mapping of $X \times X$ into the scalar field $K$ of $X$, that is, with every pair of vectors $x$ and $y$ there is associated a scalar which is written $\langle x,y\rangle$.

$
(\mathrm{IP}1)\quad \langle x+y,z\rangle = \langle x,z\rangle + \langle y,z\rangle
$

$
(\mathrm{IP}2)\quad \langle \alpha x,y\rangle = \alpha \langle x,y\rangle
$

$
(\mathrm{IP}3)\quad \langle x,y\rangle = \overline{\langle y,x\rangle}
$

$
(\mathrm{IP}4)\quad \langle x,x\rangle > 0, \qquad \langle x,x\rangle = 0 \iff x = 0
$

An inner product on $X$ defines a norm on $X$ given by
$$
\\|x\\| = \sqrt{\langle x,x\rangle}
$$

and a metric on $X$ given by
$$
d(x,y) = \\\|x-y\\\| = \sqrt{\langle x-y, x-y\rangle}
$$

From (IP1) and (IP3), we obtain

$
\text{(a)}\quad \langle \alpha x + \beta y,z\rangle = \alpha \langle x,z\rangle + \beta \langle y,z\rangle
$

$
\text{(b)}\quad \langle x,\alpha y\rangle = \overline{\alpha}\,\langle x,y\rangle
$

$
\text{(c)}\quad \langle x,\alpha y + \beta z\rangle = \overline{\alpha}\,\langle x,y\rangle + \overline{\beta}\,\langle x,z\rangle
$

-- An inner product space satisfies the parallelogram equality
$$
\\\|x+y\\\|^2 + \\\|x-y\\\|^2 = 2(\\\|x\\\|^2 + \\\|y\\\|^2)
$$

### 1.2 Definition (Orthogonality)

-- An element $x$ of an inner product space $X$ is said to be orthogonal to an element $y \in X$ if
$$
\langle x,y\rangle = 0.
$$

-- We also say that $x$ and $y$ are orthogonal, and we write $x \perp y$. Similarly, for subsets $A, B \subset X$ we write $x \perp A$ if $x \perp a$ for all $a \in A$. $A \perp B$ if $a \perp b$ for all $a \in A$ and $b \in B$.

### Examples

**1. Euclidean space $\mathbb{R}^n$.** Hilbert space with inner product:
$$
\langle x,y\rangle = \xi_1 \eta_1 + \ldots + \xi_n \eta_n
$$
where $x = (\xi_i) = (\xi_1,\ldots,\xi_n); \quad y = (\eta_i) = (\eta_1,\ldots,\eta_n)$.
Then
$$\\\|x\\\| = \langle x,x\rangle^{1/2} = (\xi_1^2 + \ldots + \xi_n^2)^{1/2}$$
with Euclidean metric $$\mathrm{d}(x, y) = \\\| x - y \\|| = \langle x-y, x-y \rangle^{1/2} = [(\xi_1 - \eta_1)^2 + \ldots +(\xi_n - \eta_n)^2]^{1/2}$$ 

**2. Unitary space $\mathbb{C}^n$.** Hilbert space with inner product:
$$
\langle x,y\rangle = \sum_ {i=1}^n \xi_i \overline{\eta_i}
$$
The norm is defined by 
$$
\\\|x\\\| = \left(\sum_{i=1}^n \xi_i \overline{\xi_i}\right)^{1/2}
= \left(\sum_{i=1}^n |\xi_i|^2\right)^{1/2}
$$

**3. Space $L^2[a,b]$.** Hilbert space with norm:
$$
\\\|x\\\| = \left(\int_a^b x(t)^2\ \mathrm{d}t\right)^{1/2}
$$
and can be obtained from the inner product defined by
$$
\langle x,y\rangle = \int_a^b x(t)y(t)\mathrm{d}t
$$
Consider complex-valued functions $\Rightarrow$ complex vector space $\Rightarrow$ inner product space:
$$
\langle x,y\rangle = \int_a^b x(t)\overline{y(t)}\mathrm{d}t
$$

**4. Hilbert sequence space $\ell^2$.** Hilbert space with inner product:
$$
\langle x,y\rangle = \sum_{j=1}^{\infty} \xi_j \overline{\eta_j}
$$
The norm is defined by 
$$
\\\|x\\\| = \langle x,x\rangle^{1/2}
= \left(\sum_{j=1}^{\infty} |\xi_j|^2\right)^{1/2}
$$

---

## 2. Further Properties of Inner Product Space

### 2.1 Lemma (Schwarz inequality, triangle inequality)
$\text{(a)}$ We have:
$$
\\|\langle x,y\rangle\\| \le \\\|x\\\|\ \\\|y\\\|
$$
The equality sign holds if and only if $\\{x,y\\}$ is a linearly dependent set.

$\text{(b)}$ The norm also satisfies:
$$
\\|x+y\\| \le \\|x\\| + \\|y\\|
$$
where the equality sign holds if and only if $y = 0$ or $x = cy$ $(c \in \mathbb{R},\ c \ge 0)$.

### 2.2 Lemma (Continuity of inner product)

If in an inner product space, $x_n \to x$ and $y_n \to y$, then $\langle x_n,y_n\rangle \to \langle x,y\rangle$.

*Proof.*
\begin{align}
|\langle x_n,y_n\rangle - \langle x,y\rangle| &= |\langle x_n,y_n\rangle - \langle x_n,y\rangle + \langle x_n,y\rangle - \langle x,y\rangle| \\\\
& \le |\langle x_n,y_n - y\rangle| + |\langle x_n - x,y\rangle| \\\\
& \le \\|x_n\\|\\|y_n - y\\| + \\|x_n - x\\|\\|y\\| \to 0
\end{align} 

An isomorphism $T$ of an inner product space $X$ onto an inner product space $\tilde X$ over the same field is a bijective linear operator $T:X \to \tilde X$ which preserves the inner product:
$$
\langle Tx,Ty\rangle = \langle x,y\rangle \quad \text{for all } x,y \in X.
$$

+ $\tilde X$ is isomorphic with $X$ $\Rightarrow$ $X$ and $\tilde X$ are called isomorphic inner product spaces.
+ Bijectivity and linearity guarantees that $T$ is a vector space isomorphism of $X$ onto $\tilde X$ $\Rightarrow$ $T$ preserves the whole structure of inner product space.
+ $T$ is also an isometry of $X$ onto $\tilde X$ because distances in $X$ and $\tilde X$ are determined by the norms defined by the inner products on $X$ and $\tilde X$.

### 2.3 Theorem (Completion)
For any inner product space $X$ there exists a Hilbert space $H$ and an isomorphism $A$ from $X$ onto a dense subspace $W \subset H$. The space $H$ is unique except for isomorphisms.

-- $H$ is unique except for isometries, that is, two completions $H$ and $\tilde H$ of $X$ are related by an isometry $T:H \to \tilde H$. Then, $T$ must be an isomorphism of the Hilbert space $H$ onto the Hilbert space $\tilde H$.

-- A subspace $Y$ of an inner product space $H$ is defined to be a subspace of $H$, regarded as an inner product space.

$$
!!\quad Y \text{ need not to be a Hilbert space because } Y \text{ may not be complete.}
$$

### 2.4 Theorem (Subspace)
Let $Y$ be a subspace of a Hilbert space $H$. Then:

$\text{(a)} \quad$ $Y$ is complete if and only if $Y$ is closed in $H$.

$\text{(b)} \quad$ If $Y$ is finite dimensional, then $Y$ is complete.

$\text{(c)} \quad$ If $H$ is separable, so is $Y$. More generally, every subset of a separable inner product space is separable.

---

## 3. Orthogonal Complements and Direct Sums
In a metric space $X$, the distance $\delta$ from an element $x \in X$ to a nonempty subset $M \subset X$ is defined to be:
$$
\delta = \inf_{\tilde{y} \in M} d(x,\tilde y).
$$

In a normed space this becomes:
$$
\delta = \inf_{\tilde y \in M} \\|x - \tilde y\\|.
$$
