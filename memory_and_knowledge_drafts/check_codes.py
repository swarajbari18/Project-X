import re,subprocess,glob,os,sys
root='knowledge_base/architecture/constructed_architecture_from_section12'
def codes_in(text):
    out=set()
    for m in re.finditer(r'<!--(.*?)-->',text,re.S):
        inner=m.group(1).strip()
        if inner.startswith('Every rule') or inner.startswith('Agent-only'): continue
        for part in inner.split(';'):
            c=part.strip()
            if c: out.add(c)
    return out
def index_keys(text):
    keys=set()
    for line in text.split('\n'):
        if line.startswith('| ') and not line.startswith('|---'):
            k=line.split('|')[1].strip()
            keys.add(k)
    return keys
def run(get):
    gaps=set()
    for d in sorted(glob.glob(root+'/*/')):
        idx=get(d+'code_index.md')
        if idx is None: continue
        keys=index_keys(idx)
        for f in sorted(glob.glob(d+'*.md')):
            if f.endswith('code_index.md'): continue
            t=get(f)
            if t is None: continue
            for c in codes_in(t):
                if c not in keys: gaps.add((os.path.basename(d.rstrip('/')),c))
    return gaps
def work(p):
    return open(p).read() if os.path.exists(p) else None
def head(p):
    r=subprocess.run(['git','show','HEAD:'+p],capture_output=True,text=True)
    return r.stdout if r.returncode==0 else None
W=run(work); H=run(head)
print('HEAD gaps',len(H),'WORK gaps',len(W))
new=sorted(W-H)
print('NEW gaps',len(new))
for x in new: print(' ',x)
