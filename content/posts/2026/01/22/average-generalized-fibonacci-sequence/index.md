---
title: Average of Generalized Fibonacci Sequence
date: 2026-01-22
categories:
  - writings
tags:
  - Integer Sequence
---

<center><b>Abstract</b></center>

In this post, I will generalized the result from paper of [Amirali Fatehizadeh & Daniel Yaqubi](https://cs.uwaterloo.ca/journals/JIS/VOL25/Yaqubi/yaq6.pdf).  

<!--more--> 

## 1. Introduction 
Given two positive integers $a$ and $m$ such that $a-2$ is not divisible by $4$. Let the sequence $(S_n)\_{n \in \mathbb{N}}$ defined by $S_0 = 0, S_1 = 1$ and $S_{n+1} = aS_n - S_{n-1}$ for all $n \in \mathbb{N}.$
Then, for each $m$, there exists a positive integer $n$ has $m$ distinct prime divisors such that $$n \mid S_1 + S_2 + \ldots + S_n$$ 

## 2. Preliminaries  

{{< lemma 1 >}}
From the general formula of $S_n$ and $T_n$, the following holds 

<ol class = "roman-paren">
  <li>$S_{2n} = S_{n} T_n$</li>
  <li>$S_{2n+1}-1 = S_nT_{n+1} $</li>
</ol>  
{{< /lemma >}}

{{<lemma 2>}}
For prime number $p$, we always have $p \mid S_{p-(\frac{\Delta}{p})} $ where $\Delta = a^2-{4}$ và $(\frac{\bullet}{p})$ is *Legendre* symbol. 
{{</lemma>}}
## Main result

Consider the case $m = 1.$ Then, we only need to choose $n = p$ where $p$ is a prime divisor of $\Delta$ then of course, we have 
$$p \mid S_{p - (\frac{\Delta}{p})} = S_p.$$ 

Now, we consider the case $m \geq 2.$ 

Then, we denote $p_1,p_2,\dots, p_m$ are $m$ first primes and we choose $ n = (p_1p_2\cdots p_m)^{p_m}$. 
Consider $p_1 = 2$ then since $a-2$ is not divisible by 4 so $S_2=a$ or $S_3=a^2-1$ is divisible by 4. From this and following lemma 3, we derive that $2^{p_m+1} \mid S_n$. On the other hand, we fix an index $i \ge 2$ thì ta suy ra, there must exist numbers $\alpha_{j,i}$ for all $j = \overline{1,i-1}$ such that $$p_i\pm 1 = p_1^{\alpha_{1,i}}\cdot p_2^{\alpha_{2,i}}\cdots p_{i-1}^{\alpha_{i-1,i}} \quad \forall j = \overline{1,i-1}$$ 

From this, fix a $p \in \{p_1,\ldots, p_m\}$. 

Consider $p \neq 2,$ we see that $$p \pm 1 = p_1^{\alpha_1}\cdot p_2^{\alpha_2}\cdots p_{m}^{\alpha_m}$$ so we derive that $p \mid S_{p - (\frac{\Delta}{p})}$. Từ đây, áp dụng bổ đề 3, ta sẽ suy ra 