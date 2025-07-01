if [ -z "$CI" ]; then
  husky
  nx run-many -t up
fi
