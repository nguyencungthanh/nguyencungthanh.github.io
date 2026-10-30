---
title: A note on Fourier–Walsh Analysis on the Boolean Cube
date: 2026-10-29
slug: fourier-walsh-analysis-on-the-boolean-cube
description: From measure spaces and L2 geometry to the Walsh basis, Fourier expansions, Parseval's identity, and approximation on the Boolean cube.
categories:
  - writings
tags:
  - fourier analysis
  - boolean functions
  - functional analysis
draft: false
---

The Fourier–Walsh expansion represents functions on $\Omega_n=\lbrace-1,1\rbrace^n$ in an orthonormal basis of coordinate products. The construction proceeds from a measure space to its Hilbert space $L^2$, then uses orthogonality to derive the coefficients and approximation formulas. On the Boolean cube, the integrals defining the inner product become finite averages.

<!--more-->

The construction uses real scalars. Background on measurable functions and integration is given in [Abstract measure theory](/2026/05/02/abstract-measure-theory/); the geometry of inner products is discussed in [Hilbert Space](/2026/04/27/hilbert-space/).

## 1. From a Set to a Space of Functions

### 1.1 Pointwise vector operations

Let $\Omega$ be an arbitrary set. The functions $f:\Omega\to\mathbb R$ form a vector space $\mathcal{V}(\Omega)$ under pointwise operations: $(f+g)(x)=f(x)+g(x)$ and $(\alpha f)(x)=\alpha f(x)$ for $x\in\Omega$ and $\alpha\in\mathbb R$. Both operations use the vector space structure of the codomain $\mathbb R$.

If $\Omega$ has $m$ elements, ordering them identifies a function with its vector of values in $\mathbb R^m$, so $\dim\mathcal{V}(\Omega)=m$. For a general domain, an inner product can be constructed by integrating products of functions, after imposing measurability and integrability conditions.

### 1.2 Measures and integration

A **measure space** $(\Omega,\mathcal A,\mu)$ consists of a set $\Omega$, a $\sigma$-algebra $\mathcal A$ of its subsets, and a measure $\mu:\mathcal A\to[0,\infty]$. The $\sigma$-algebra contains $\Omega$ and is closed under complements and countable unions. The measure is countably additive on disjoint measurable sets and satisfies $\mu(\varnothing)=0$.

This structure defines the integral $\int_\Omega f(x)\\,\mathrm{d}\mu(x)$ for measurable functions whenever the integral exists. If $\mu(\Omega)=1$, then $\mu$ is a probability measure, and integration gives the expectation of a function under that probability distribution.

## 2. Constructing the Hilbert Space $L^2$

### 2.1 Square integrability and equivalence classes

Fix a measure space $(\Omega,\mathcal A,\mu)$. The measurable functions $f:\Omega\to\mathbb R$ satisfying $\int_\Omega|f(x)|^2\\,\mathrm{d}\mu(x)<\infty$ form a vector space, denoted by $\mathcal V_2(\Omega,\mu)$.

Two such functions are identified when they agree outside a measurable set of measure zero. This is equality **almost everywhere** with respect to $\mu$. The space $L^2(\Omega,\mu)$ consists of the resulting equivalence classes; a function symbol denotes a representative of its class.

For $f,g\in L^2(\Omega,\mu)$, define

$$\langle f,g\rangle=\int_\Omega f(x)g(x)\\,\mathrm{d}\mu(x).$$

The integral form of Cauchy–Schwarz ensures that the product is integrable. The integral defines a symmetric bilinear form on equivalence classes, and $\langle f,f\rangle=0$ holds if and only if $f=0$ almost everywhere. The form is therefore positive definite. Its induced norm is

$$\lVert f\rVert_{L^2(\Omega,\mu)}=\left(\int_\Omega|f(x)|^2\\,\mathrm{d}\mu(x)\right)^{1/2}.$$

On the original functions, this expression defines a seminorm whose kernel consists of functions that vanish almost everywhere. Over complex scalars, the corresponding inner product uses $f(x)\overline{g(x)}$ in the integral.

**Theorem 2.1.** For every measure space $(\Omega,\mathcal A,\mu)$, the space $L^2(\Omega,\mu)$ is complete in the norm defined above. Consequently, $\mathcal{H}=L^2(\Omega,\mu)$ is a Hilbert space.

Completeness is the $p=2$ case of the Riesz–Fischer theorem; a proof is given in [Hunter's notes, Theorem 7.10](https://www.math.ucdavis.edu/~hunter/measure_theory/measure_notes_ch7.pdf).

### 2.2 Counting and Lebesgue measures

Counting measure on $\lbrace1,\ldots,m\rbrace$ identifies $L^2$ with $\mathbb R^m$. The inner product is $\langle f,g\rangle=\sum_{i=1}^m f(i)g(i)$, so the identification preserves the Euclidean geometry.

Counting measure on $\mathbb N$ gives the sequence space $\ell^2$. A sequence $a=(a_1,a_2,\ldots)$ belongs to this space when $\sum_{j=1}^\infty|a_j|^2<\infty$, and its inner product with $b\in\ell^2$ is $\langle a,b\rangle=\sum_{j=1}^\infty a_jb_j$.

On $[0,1]$ with Lebesgue measure $\lambda$, the same construction gives $L^2([0,1],\lambda)$ with inner product $\langle f,g\rangle=\int_{[0,1]}f(x)g(x)\\,\mathrm{d}\lambda(x)$. Here elements are classes of measurable functions whose squared absolute values have finite integrals, with equality understood almost everywhere.

### 2.3 The role of $p=2$

For $1\le p<\infty$, the space $L^p(\Omega,\mu)$ consists of equivalence classes of measurable functions satisfying $\int_\Omega|f(x)|^p\\,\mathrm{d}\mu(x)<\infty$. Its norm is

$$\lVert f\rVert_{L^p(\Omega,\mu)}=\left(\int_\Omega|f(x)|^p\\,\mathrm{d}\mu(x)\right)^{1/p}.$$

At $p=\infty$, the space $L^\infty(\Omega,\mu)$ consists of classes of essentially bounded measurable functions, and its norm is the essential supremum of $|f|$ on $\Omega$ with respect to $\mu$.

The Riesz–Fischer theorem gives completeness for every $1\le p\le\infty$, so these spaces are [Banach spaces](/2025/10/08/banach-space/). At $p=2$, the identity $\lVert f\rVert_{L^2(\Omega,\mu)}^2=\langle f,f\rangle$ supplies the geometry of orthogonality and projection used in the Fourier construction.

## 3. Orthonormal Coordinates and Orthogonal Projection

Let $\mathcal{H}$ be a Hilbert space of finite dimension $m$, with inner product $\langle\cdot,\cdot\rangle$. Its induced norm is $\lVert v\rVert_{\mathcal{H}}=\sqrt{\langle v,v\rangle}$.

A family $e_1,\ldots,e_k$ is **orthonormal** if $\langle e_i,e_j\rangle=\delta_{ij}$, where $\delta_{ij}$ equals $1$ for $i=j$ and $0$ otherwise. Such a family is linearly independent: if $\sum_i a_ie_i=0$, taking the inner product with $e_j$ gives $a_j=0$. An orthonormal family of $m$ vectors therefore forms a basis of $\mathcal{H}$.

**Proposition 3.1.** If $e_1,\ldots,e_m$ form an orthonormal basis of $\mathcal{H}$, then every $v\in\mathcal{H}$ has the unique expansion $v=\sum_{j=1}^{m}\langle v,e_j\rangle e_j$.

*Proof.* The basis property gives an expansion $v=\sum_j c_je_j$. Taking the inner product with $e_k$ yields $\langle v,e_k\rangle=c_k$ by orthonormality. Thus every coefficient is uniquely determined.

**Proposition 3.2.** Let $\mathcal{V}=\operatorname{span}\lbrace e_1,\ldots,e_k\rbrace$, where $e_1,\ldots,e_k$ are orthonormal. For each $v\in\mathcal{H}$, the unique element of $\mathcal{V}$ minimizing $\lVert v-u\rVert_{\mathcal{H}}$ is $P_{\mathcal{V}}v=\sum_{j=1}^{k}\langle v,e_j\rangle e_j$.

*Proof.* Set $p=P_{\mathcal{V}}v$. For each $j\le k$, orthonormality gives $\langle v-p,e_j\rangle=0$. Hence $v-p$ is orthogonal to $\mathcal{V}$. For any $u\in\mathcal{V}$, the decomposition $v-u=(v-p)+(p-u)$ is orthogonal, and Pythagoras gives

$$\lVert v-u\rVert_{\mathcal{H}}^2=\lVert v-p\rVert_{\mathcal{H}}^2+\lVert p-u\rVert_{\mathcal{H}}^2.$$

The minimum is attained precisely when $u=p$.

## 4. Fourier–Walsh Analysis on the Boolean Cube

Set $\Omega_n=\lbrace-1,1\rbrace^n$, take the full $\sigma$-algebra $\mathcal A=2^{\Omega_n}$, and assign each point probability $\mu(\lbrace x\rbrace)=2^{-n}$. Every function on the cube is measurable and square integrable. Since every point has positive probability, the only set of measure zero is the empty set. Equality almost everywhere is therefore pointwise equality, so $L^2(\Omega_n,\mu)$ is identified with the entire vector space $\mathcal{V}(\Omega_n)$.

In this setting, the integral of any function is a finite average:

$$\int_{\Omega_n}f(x)\\,\mathrm{d}\mu(x)=2^{-n}\sum_{x\in\Omega_n}f(x).$$

For the rest of the article, write $\mathcal{H}=L^2(\Omega_n,\mu)$. If $X=(X_1,\ldots,X_n)$ is uniformly distributed on $\Omega_n$, the inner product becomes

$$\langle f,g\rangle=\mathbb E[f(X)g(X)]=2^{-n}\sum_{x\in\Omega_n}f(x)g(x).$$

The notation $\lVert f\rVert_2$ denotes the $L^2(\Omega_n,\mu)$ norm, so $\lVert f\rVert_2=(\mathbb E[f(X)^2])^{1/2}$. The space has dimension $2^n$. The coordinates of $X$ are independent and satisfy $\mathbb E[X_i]=0$ and $\mathbb E[X_i^2]=1$.

It remains to construct $2^n$ orthonormal functions.

### 4.1 Constructing the Walsh Basis

For a single coordinate with the uniform distribution on $\lbrace -1,1\rbrace$, the functions $1$ and $x$ are orthonormal: their squared norms equal $1$, and their inner product is $\mathbb E[X]=0$. A product construction extends these functions to $n$ coordinates. At coordinate $i$, choose either $1$ or $x_i$, and multiply the choices. A subset $S\subseteq[n]$, where $[n]=\lbrace1,\ldots,n\rbrace$, records the coordinates contributing $x_i$.

For each $S\subseteq[n]$, define the **Walsh function** $\chi_S(x)=\prod_{i\in S}x_i$, with the convention $\chi_\varnothing(x)=1$. These functions are also called **parity functions**: $\chi_S(x)$ equals $1$ when an even number of coordinates indexed by $S$ are negative, and $-1$ when that number is odd.

**Theorem 4.1.** The family $\lbrace\chi_S:S\subseteq[n]\rbrace$ is an orthonormal basis of $\mathcal{H}$.

*Proof.* Since $x_i^2=1$, the product of two Walsh functions satisfies $\chi_S(x)\chi_T(x)=\chi_{S\triangle T}(x)$, where $S\triangle T$ is the symmetric difference of the two sets. If $S=T$, this product is identically $1$, so $\langle\chi_S,\chi_T\rangle=1$. If $S\ne T$, independence and the fact that each coordinate has mean zero imply

$$\langle\chi_S,\chi_T\rangle=\mathbb E[\chi_{S\triangle T}(X)]=\prod_{i\in S\triangle T}\mathbb E[X_i]=0.$$

Thus $\langle\chi_S,\chi_T\rangle=\delta_{ST}$. There are $2^n$ subsets of $[n]$, giving $2^n$ orthonormal functions in a space of dimension $2^n$. The family therefore forms a basis.

### 4.2 The Fourier–Walsh Expansion

**Theorem 4.2.** Every function $f:\Omega_n\to\mathbb R$ has the unique representation

$$f(x)=\sum_{S\subseteq[n]}\widehat f(S)\chi_S(x),$$

where $\widehat f(S)=\langle f,\chi_S\rangle=\mathbb E[f(X)\chi_S(X)]$.

*Proof.* Apply Proposition 3.1 to the basis in Theorem 4.1.

The sum is finite and holds at every point of $\Omega_n$. Each coordinate occurs at most once in a Walsh function, so the expansion is a **multilinear polynomial**. It is the unique multilinear polynomial agreeing with $f$ on the cube. The relation $x_i^2=1$ allows distinct polynomials to represent the same function on this domain.

The constant coefficient is $\widehat f(\varnothing)=\mathbb E[f(X)]$. For a singleton set, $\widehat f(\lbrace i\rbrace)=\mathbb E[f(X)X_i]$ measures alignment with coordinate $i$. Larger sets index products involving several coordinates. The degree of $\chi_S$ is $|S|$.

For a Boolean function $f:\Omega_n\to\lbrace-1,1\rbrace$, the product $f(X)\chi_S(X)$ equals $1$ on agreement and $-1$ on disagreement. Consequently,

$$\widehat f(S)=2\mathbb P\bigl(f(X)=\chi_S(X)\bigr)-1.$$

### 4.3 Parseval's Identity, Mean and Variance

**Theorem 4.3.** For every $f\in\mathcal{H}$,

$$\lVert f\rVert_2^2=\mathbb E[f(X)^2]=\sum_{S\subseteq[n]}\widehat f(S)^2.$$

*Proof.* Substituting the Fourier expansion into the inner product and using orthonormality yields

$$\langle f,f\rangle=\sum_{S,T\subseteq[n]}\widehat f(S)\widehat f(T)\langle\chi_S,\chi_T\rangle=\sum_{S\subseteq[n]}\widehat f(S)^2.$$

The same argument gives $\langle f,g\rangle=\sum_{S\subseteq[n]}\widehat f(S)\widehat g(S)$ for $f,g\in\mathcal{H}$. The Fourier transform preserves this inner product when the coefficient space carries the Euclidean inner product.

Since $\widehat f(\varnothing)=\mathbb E[f(X)]$, subtracting the mean removes the constant Walsh term. Applying Parseval's identity to the remaining expansion gives

$$\operatorname{Var}(f(X))=\sum_{\varnothing\ne S\subseteq[n]}\widehat f(S)^2.$$

For a Boolean function, $f(X)^2=1$, and hence $\sum_{S\subseteq[n]}\widehat f(S)^2=1$.

### 4.4 Approximation by Polynomials of Bounded Degree

For an integer $0\le d\le n$, let $\mathcal V_d$ be the subspace of $\mathcal{H}$ spanned by the functions $\chi_S$ with $|S|\le d$. Equivalently, $\mathcal V_d$ consists of functions represented by multilinear polynomials of degree at most $d$. Define the truncated expansion by $f_{\le d}=\sum_{|S|\le d}\widehat f(S)\chi_S$, where the sum runs over subsets of $[n]$.

**Proposition 4.4.** The function $f_{\le d}$ is the unique minimizer of $\lVert f-g\rVert_2^2=\mathbb E[(f(X)-g(X))^2]$ over $g\in\mathcal V_d$, and its squared approximation error is

$$\lVert f-f_{\le d}\rVert_2^2=\sum_{|S|>d}\widehat f(S)^2.$$

*Proof.* Proposition 3.2 identifies $f_{\le d}$ as the orthogonal projection onto $\mathcal V_d$. The residual contains precisely the omitted Walsh terms, so Parseval's identity gives the error formula.

The minimization uses the uniform $L^2$ norm over $\mathcal V_d$, with $\mathbb R$ as the codomain of the approximating function.

## References

[1] O'Donnell, R. (2014). [*Analysis of Boolean Functions*](https://doi.org/10.1017/CBO9781139814782). Cambridge University Press. Chapter 1. A [revised text maintained by the author](https://www.cs.cmu.edu/~odonnell/papers/Analysis-of-Boolean-Functions-by-Ryan-ODonnell.pdf) is freely available.

[2] Hunter, J. K. (2011). [*Measure Theory*, Chapter 7: $L^p$ spaces](https://www.math.ucdavis.edu/~hunter/measure_theory/measure_notes_ch7.pdf). University of California, Davis.
