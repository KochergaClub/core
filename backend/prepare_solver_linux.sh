#!/bin/bash

if [[ -e minizinc ]]; then exit 0; fi
mkdir minizinc 2>/dev/null

apt-get install -y libglu1-mesa

pushd minizinc
wget -q 'https://github.com/MiniZinc/MiniZincIDE/releases/download/2.2.3/MiniZincIDE-2.2.3-bundle-linux-x86_64.tgz' -O mz.tgz
tar -xzf mz.tgz
rm mz.tgz
mv MiniZinc* ide

# launch script
tee minizinc > /dev/null << "EOF"
#!/bin/bash
export PATH=`dirname $0`/ide/bin:$PATH
export LD_LIBRARY_PATH=`dirname $0`/ide/lib:${LD_LIBRARY_PATH}
export QT_PLUGIN_PATH=`dirname $0`/ide/plugins:${QT_PLUGIN_PATH}
minizinc --output-mode json $@ | head -n -1
EOF

chmod +x minizinc
popd
