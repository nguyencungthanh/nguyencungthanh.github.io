---
title: Real Analytic Function in Hilbert space
date: 2026-04-29
# update: 2026-04-27
categories:
  - writings
tags:
  - functional analysis 
  - tensor
  - feature map
---

<center><b>Abstract</b></center>

$\quad$ We study representations of functions of inner products via embeddings into Hilbert spaces. While polynomials with nonnegative coefficients admit a single feature map realization, this approach fails when negative coefficients are present. To address this limitation, we introduce a two-map framework. Specifically, for any analytic function $f(x) = \sum_{k=0}^{\infty} a_k x^k$ with global convergence, we construct a Hilbert space $H$ and transformations $\Phi, \Psi: \mathbb{R}^n \to H$ such that 
$$\langle \Phi(u), \Psi(v) \rangle = f(\langle u, v \rangle)
\quad \text{for all } u, v \in \mathbb{R}^n.$$ 
<!--more--> 

## 1. Real analytic function 
We start with the following problem: 

Let $P(x)$ be a polynomial with nonnegative coefficients, then there exists a Hilbert space $H$ and a transformation $\Phi : \mathbb{R}^n \to H$ such that: 
$$\langle \Phi(u), \Phi(v) \rangle = P(\langle u, v \rangle) \quad \text{for all } u, v \in \mathbb{R^n}.$$ 
But our task can be impossible if $P$ has a negative coefficient since $\langle \Phi(u), \Phi(v) \rangle$ is always nonnegative. Therefore, a natural question is what if we consider two transformations $\Phi, \Psi: \mathbb{R}^n \to H?$ This leads us to a more general problem about analytic function as follow. 

Consider a function
$$
f(x) = \sum_{k=0}^{\infty} a_k x^k
$$
where the series absolutely converges for all $x \in \mathbb{R}$. There exist a Hilbert space $H$ and transformations $\Phi, \Psi : \mathbb{R}^n \to H$ such that
$$
\langle \Phi(u), \Psi(v) \rangle = f(\langle u, v \rangle)
\quad \text{for all } u, v \in \mathbb{R}^n.
$$
Also, for any unit vector $u$, we have 
$$ \\|\Phi(u)\\|_H^2 = \\|\Psi(u)\\|_H^2 =\sum _{k=0}^{\infty} \|a_k\| .$$
*Proof.* 

For each $k \ge 0$, let $V_k = \mathbb{R}^{n^k}$ and define
$$
H = \bigoplus_{k=0}^{\infty} V_k =
\left\\{ (w_0, w_1, \dots) : w_k \in V_k,\ \sum_{k=0}^{\infty} \\|w_k\\|^2 < \infty \right\\}
$$

with inner product
$$
\langle w, z \rangle_H = \sum_{k=0}^{\infty} \langle w_k, z_k \rangle_{V_k}.
$$

Consider $s_k = \operatorname{sign}(a_k)$ and write $a_k = s_k |a_k|$. For $u \in \mathbb{R}^n$, define
$$ 
\Phi(u) = (\sqrt{|a_0|} u^{\otimes 0}, \sqrt{|a_1|} u^{\otimes 1}, \dots),
$$

$$
\Psi(v) = (s_0 \sqrt{|a_0|} v^{\otimes 0}, s_1 \sqrt{|a_1|} v^{\otimes 1}, \dots).
$$

Then we prove that $\Phi(u), \Psi(v) \in H$. Indeed, we have: 
$$
\left\\|\sqrt{|a_k|} u^{\otimes k}\right\\|^2 = |a_k| \left\\|u^{\otimes k}\right\\|^2 = |a_k| \\|u\\|^{2k}.
$$

Thus,
$$ \sum_{k=0}^{\infty}\left\\|\sqrt{|a_k|} u^{\otimes k}\right\\|^2 = \sum_{k=0}^{\infty} |a_k| \\|u\\|^{2k}
$$
converges, so $\Phi(u) \in H$. Similarly, $\Psi(v) \in H$.

On the other hand,
$$
\begin{aligned}
\langle \Phi(u), \Psi(v) \rangle_H &=
\sum_{k=0}^{\infty} \left\langle \sqrt{|a_k|} u^{\otimes k}, s_k \sqrt{|a_k|} v^{\otimes k}
\right\rangle_{V_k} \\\\
&= \sum_{k=0}^{\infty} s_k \|a_k\| \langle u^{\otimes k}, v^{\otimes k} \rangle\\\\
&= \sum_{k=0}^{\infty} a_k \langle u, v \rangle^k \\\\
&= f(\langle u, v \rangle).
\end{aligned}
$$

**Note.** Norm when $u$ is a unit vector: If $\\|u\\| = 1$, then
$$
\\|u^{\otimes k}\\|^2 = \\|u\\|^{2k} = 1.
$$

Hence, 
$$\\|\Phi(u)\\|_H^2 = \sum _{k=0}^{\infty} \|a_k\| \\| u^{\otimes k} \\|^2 = \sum _{k=0}^{\infty} \|a_k\|.$$

### Example

**Sine.**  Let $c > 0$. Then function $ f(x) = \sin(cx) $ is real analytic 
$$
\sin(cx) = cx - \frac{(cx)^3}{3!} + \frac{(cx)^5}{5!} - \ldots
$$

Thus, there exists a Hilbert space $H$ and transformation $\Phi, \Psi: \mathbb{R}^n \to H$ such that
$$
\langle \Phi(u), \Psi(v) \rangle = \sin(c \langle u, v \rangle)\quad \text{for all } u, v \in \mathbb{R}^n.
$$

Also, $\Phi$ and $\Psi$ map unit vectors to unit vectors if
$$ 
1 = c + \frac{c^3}{3!} + \frac{c^5}{5!} + \ldots = \frac{e^c - e^{-c}}{2}.
$$

Hence,
$$
c = \ln(1 + \sqrt{2}).
$$


## 2. Kernels and feature maps
Given a function of two variables $ K : \mathcal{X} \times \mathcal{X} \to \mathbb{R},$ on some set sets $\mathcal{X}$, when can we find a Hilbert space $H$ and a transformation $\Phi : \mathcal{X} \to H$ so that

<span class="sidenote" id="note1">
    1. The kernel trick, which expresses a kernel $K(u, v)$ as an inner product, is widely used in machine learning because it lets us handle non-linear models (determined by $K$) with techniques designed for linear models.
</span>

$$
\langle \Phi(u), \Phi(v) \rangle = K(u,v)^{\textcolor{gray} 1}  \quad \text{for all } u, v \in \mathcal{X}?
$$

The answer is given by Mercer theorem<sup>2</sup>
<span class="sidenote" id="note2">
    2. <a href="https://dornsife.usc.edu/sergey-lototsky/wp-content/uploads/sites/211/2023/11/Mercer-original-compressed_compressed.pdf"> Functions of positive and negative type and their connection with the theory of integral equations</a> (Mercer, 1909).
</span> and, more precisely, Moore-Aronszajn theorem:

$-$ The necessary and sufficient condition: $K$ is a *positive semidefinite kernel*, i.e., for any $u_1, \dots, u_N \in \mathcal{X}$, the matrix
$ (K(u_i, u_j))_{i,j=1}^N $ is symmetric and positive semidefinite.

$-$ Transformation $\Phi$ is called a *feature map*.

$-$ The Hilbert space $H$ is called a *reproducing kernel Hilbert space*<sup>3</sup> (RKHS). 
<span class="sidenote" id="note3">
    3. <a href="https://arxiv.org/abs/2106.08443"> Reproducing Kernel Hilbert Space, Mercer's Theorem, Eigenfunctions, Nyström Method, and Use of Kernels in Machine Learning: Tutorial and Survey</a> (Ghojogh et al, 2021).
</span>

$-$ Popular positive semidefinite kernels in machine learning include the Gaussian and polynomial kernels given by: 
$$
K(u,v) = \exp \left( -\frac{\\|u - v\\|^2}{2\sigma^2} \right), \quad K(u,v) = (\langle u, v \rangle + r)^k, \quad u, v \in \mathbb{R}^n.
$$
where $\sigma > 0, r > 0,$ and $k \in \mathbb{N}$ are parameters. 

## References 

[1] Vershynin, R. (2026). *High-dimensional probability: An introduction with applications in data science* (2nd ed.). Cambridge University Press.