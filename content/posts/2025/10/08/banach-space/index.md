---
title: Banach space
date: 2025-10-08
categories:
  - writings
tags:
  - functional analysis 
---

<!--more--> 

# Normed Spaces and Banach Spaces

## 1. Definition (Normed Space, Banach Space)
A normed space $X$ is a vector space with a norm defined on it. A Banach space is a complete normed space (complete in the metric defined by the norm). Here, a norm on a (real or complex) vector space $X$ is a real-valued function on $X$ whose value at an $x \in X$ is denoted by $\\| x \\|$ (real "norm of $X$") and which has the properties:
1. $\\|x\\| \ge 0$
2. $\\|x\\| = 0 \iff x = 0$
3. $\\|\alpha x\\| = \|\alpha\|\\|x\\|$
4. $\\|x + y\\| \le \\|x\\| + \\|y\\|$ $\quad$ (Triangle inequality)

A norm on $X$ defines a metric $d$ on $X$ by
$$
d(x, y) = \\|x - y\\|,
$$
called the *metric induced* by the norm. The normed space thus defined is denoted by $(X, \\| \cdot\\|)$, or simply $X$.

### Example
**1.** Euclidean space  $\mathbb{R}^n$ and unitary space $\mathbb{C}^n$

Banach space with norm 
$$
\\|x\\| = \left( \sum_{i=1}^{n} \|x_i\|^2 \right)^{\frac{1}{2}}
$$
$\mathbb{R}^n$ and $\mathbb{C}^n$ are complete and the induced metric is
$$
d(x, y) = \\|x - y\\| = \left( \sum_{i=1}^{n} |x_i - y_i|^2 \right)^{\frac{1}{2}}.
$$

**2.** Space $\ell^p$

Banach space with norm  
$$ \\|x\\| = \left( \sum_{i = 1}^{\infty} \|x_i\|^p \right)^{\frac{1}{p}} $$ is a Banach space with 
and the induced metric is 
$$
d(x, y) = \\|x - y\\| = \left( \sum_{i=1}^{n} |x_i - y_i|^p \right)^{\frac{1}{p}}.
$$

**3.** Space $\ell^{\infty}$
Banach space with norm  
$$
\\|x\\|_\infty = \sup _{i}\\|x_i\\|
$$

**4.** Space $\ell^{\infty}$
Banach space with norm  
$$
\\|x\\| = \max _{t \in J}\\|x(t)\\|
$$
where $J = [a,b]$.

**5.** Incomplete normed space

$d(x,y) = \int _{0}^{1} \| x(t) - y(t) \| dt$ induce the norm 
$$\int _{0}^{1} \|x(t)\| dt$$

**6.** Incomplete normed space and its completion $L^p[a,b]$

The Banach space $L^p[a,b]$ with norm 
$$ \\|x\\| _p = \left( \int _{a}^{b} \|x(t)\| dt  \right)^{\frac{1}{p}} $$

**7.** Space $s$

Metric defined by $$d(x,y) = \sum _{j = 1}^{\infty} \dfrac{1}{2^j} \dfrac{\|x_j-y_j\|}{1 + \|x_j-y_j\|}$$ 
cannot be obtained a norm

### 1.1 Lemma (Translation invariance)
A metric $d$ induced by a norm on a normed space $X$ satisfies 

a) $d(x+a,y+a) = d(x,y)$

b) $d(\alpha x, \alpha y) = \|\alpha\| d(x,y)$

for all $x,y \in X$ and every scalar $\alpha$. 

## 2. Further properties of normed space

### 2.1 Theorem (Subspace of Banach space) 

A subspace $Y$ of a Banach space $X$ is complete if and only if $Y$ is closed in $X$. 

-- **Convergence of sequences**
   1. A sequence $(x_n)$ in a normed space $X$ is convergent if $X$ contains an $x$ such that 
$$\lim _{n \to \infty} \\|x_n - x \\| = 0.$$

Then we write $x_n \to x$ and call $x$ the limit of $(x_n)$.

2. A sequence $(x_n)$ in a normed space $X$ is Cauchy if for every $\epsilon > 0$ there is an $N$ such that $$\\|x_m - x_n\\| < \epsilon \quad \forall m, n > N$$ 

-- **Infinite series** $(x_k)$ is a sequence in a normed space $X$, we can associate with $(x_k)$ the sequence $(s_n)$ of partial sums.
